import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CommunityHub } from '@/components/community/CommunityHub'

export default async function CommunityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  return <CommunityHub user={user!} profile={profile} />
}
