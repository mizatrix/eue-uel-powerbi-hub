'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function registerTeam(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const teamName = formData.get('team_name') as string
  const projectId = Number(formData.get('project_id'))
  const membersList = formData.get('members') as string

  if (!teamName || !projectId) {
    redirect('/dashboard?error=Team name and project are required.')
  }

  // Check if project is already taken
  const { data: existingTeam } = await supabase
    .from('teams')
    .select('id')
    .eq('project_id', projectId)
    .single()

  if (existingTeam) {
    redirect('/dashboard?error=This project is already taken by another team.')
  }

  // Parse members into JSON array
  const members = membersList
    ? membersList.split('\n').filter(Boolean).map(line => line.trim())
    : []

  const { error } = await supabase.from('teams').insert([
    {
      team_name: teamName,
      project_id: projectId,
      leader_id: user.id,
      members,
    },
  ])

  if (error) {
    console.error('Team registration error:', error)
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard', 'page')
  redirect('/dashboard?success=Team registered successfully!')
}
