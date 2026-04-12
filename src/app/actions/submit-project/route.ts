import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  
  const formData = await req.formData()
  const team_id = formData.get('team_id') as string
  const github_url = formData.get('github_url') as string
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !team_id || !github_url) {
    return NextResponse.redirect(new URL('/dashboard?error=Missing data', req.url), { status: 302 })
  }

  // Ensure profile exists (fixes submitted_by FK constraint)
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!existingProfile) {
    const displayName = user.user_metadata?.full_name
      || user.email?.split('@')[0]
      || 'Student'

    await supabase.from('profiles').insert({
      id: user.id,
      full_name: displayName,
      role: 'student',
    })
  }

  const { error } = await supabase
    .from('submissions')
    .insert([
      {
        team_id,
        github_url,
        submitted_by: user.id
      }
    ])

  if (error) {
    console.error("Submission error:", error)
    return NextResponse.redirect(new URL(`/dashboard?error=${error.message}`, req.url), { status: 302 })
  }

  revalidatePath('/dashboard', 'page')
  return NextResponse.redirect(new URL('/dashboard', req.url), { status: 302 })
}
