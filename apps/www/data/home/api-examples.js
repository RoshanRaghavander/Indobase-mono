export default [
  {
    lang: 'js',
    title: 'Create user',
    description: 'Sign up a new user in an example chat room',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const indobaseUrl = 'https://chat-room.indobase.co'
const indobaseKey = 'public-anon-key'
const indobase = createClient(indobaseUrl, indobaseKey)

// Create a new user
const { user, error } = await indobase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})
    `,
  },
  {
    lang: 'js',
    title: 'Realtime subscriptions',
    description: 'Receive realtime messages in an example chat room',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const indobaseUrl = 'https://chat-room.indobase.co'
const indobaseKey = 'public-anon-key'
const indobase = createClient(indobaseUrl, indobaseKey)

// Get notified of all new chat messages
const realtime = indobase
  .from('messages')
  .on('INSERT', message => {
    console.log('New message!', message)
  })
  .subscribe()
    `,
  },
  {
    lang: 'js',
    title: 'Create bucket',
    description: 'Creates a new Storage bucket',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const indobaseUrl = 'https://chat-room.indobase.co'
const indobaseKey = 'public-anon-key'
const indobase = createClient(indobaseUrl, indobaseKey)

// Create a new bucket
const { data, error } = await indobase
  .storage
  .createBucket('avatars', {
    public: false,
    allowedMimeTypes: ['image/png'],
    fileSizeLimit: 1024
  })
    `,
  },
  {
    lang: 'js',
    title: 'Invoke Edge Function',
    description: 'Invoke a IndoBase Edge Function',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const indobaseUrl = 'https://chat-room.indobase.co'
const indobaseKey = 'public-anon-key'
const indobase = createClient(indobaseUrl, indobaseKey)

// Invoke a function
const { data, error } = await indobase.functions.invoke('hello', {
  body: { foo: 'bar' }
})
    `,
  },
  {
    lang: 'js',
    title: 'CRUD a record',
    description: 'Create, Read, Update and Delete all public rooms and their messages',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const indobaseUrl = 'https://chat-room.indobase.co'
const indobaseKey = 'public-anon-key'
const indobase = createClient(indobaseUrl, indobaseKey)
  
// Create a new chat room
const newRoom = await indobase
  .from('rooms')
  .insert({ name: 'IndoBase Fan Club', public: true })
    
// Get public rooms and their messages
const publicRooms = await indobase
  .from('rooms')
  .select(\`
    name,
    messages ( text )
  \`)
  .eq('public', true)
  
// Update multiple users
const updatedUsers = await indobase
  .from('users')
  .eq('account_type', 'paid')
  .update({ highlight_color: 'gold' })
    `,
  },
]
