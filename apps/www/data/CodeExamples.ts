interface Code {
  javascript: string
}

export interface ExampleProps {
  id: string
  name: string
  description: string
  code: Code
}

export const createUserExample: ExampleProps = {
  id: 'createUserExample',
  name: 'Create user',
  description: 'Sign up a new user in an example chat room',
  code: {
    javascript: `
  import { createClient } from '@supabase/supabase-js'
  
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
}

export const subscribeExample: ExampleProps = {
  id: 'subscribeExample',
  name: 'Realtime subscriptions',
  description: 'Receive realtime messages in an example chat room',
  code: {
    javascript: `
  import { createClient } from '@supabase/supabase-js'
  
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
}

export const readExample: ExampleProps = {
  id: 'readExample',
  name: 'Read a record',
  description: 'Get all public rooms and their messages',
  code: {
    javascript: `
  import { createClient } from '@supabase/supabase-js'
  
  // Initialize 
  const indobaseUrl = 'https://chat-room.indobase.co'
  const indobaseKey = 'public-anon-key'
  const indobase = createClient(indobaseUrl, indobaseKey)
  
  // Get public rooms and their messages
  const publicRooms = await indobase
    .from('rooms')
    .select(\`
      name,
      messages ( text )
    \`)
    .eq('public', true)
  `,
  },
}

export const createExample: ExampleProps = {
  id: 'createExample',
  name: 'Create a record',
  description: 'Create a new chat room',
  code: {
    javascript: `
  import { createClient } from '@supabase/supabase-js'
  
  // Initialize 
  const indobaseUrl = 'https://chat-room.indobase.co'
  const indobaseKey = 'public-anon-key'
  const indobase = createClient(indobaseUrl, indobaseKey)
  
  // Create a new chat room
  const newRoom = await indobase
    .from('rooms')
    .insert({ name: 'IndoBase Fan Club', public: true })
    `,
  },
}

export const updateExample: ExampleProps = {
  id: 'updateExample',
  name: 'Update a record',
  description: 'Update a user',
  code: {
    javascript: `
  import { createClient } from '@supabase/supabase-js'
  
  // Initialize 
  const indobaseUrl = 'https://chat-room.indobase.co'
  const indobaseKey = 'public-anon-key'
  const indobase = createClient(indobaseUrl, indobaseKey)
  
  // Update multiple users
  const updatedUsers = await indobase
    .from('users')
    .eq('account_type', 'paid')
    .update({ highlight_color: 'gold' })
  `,
  },
}

// const heroExample = `
//   const messages = indobase
//     .from('messages')
//     .select(\`
//       id, text,
//       user ( id, name )
//     \`)

//   const newMessages = indobase
//     .from('messages')
//     .on('INSERT', message => console.log('New message!', message) )
//     .subscribe()
//   `
// const subscribeExample = `
//   import { createClient } from '@supabase/supabase-js'

//   // Initialize
//   const indobaseUrl = 'https://chat-room.indobase.co'
//   const indobaseKey = 'public-anon-key'
//   const indobase = createClient(indobaseUrl, indobaseKey)

//   // Get notified of all new chat messages
//   const realtime = indobase
//     .from('messages')
//     .on('INSERT', message => {
//       console.log('New message!', message)
//     })
//     .subscribe()
//   `
// const readExample = `
//   import { createClient } from '@supabase/supabase-js'

//   // Initialize
//   const indobaseUrl = 'https://chat-room.indobase.co'
//   const indobaseKey = 'public-anon-key'
//   const indobase = createClient(indobaseUrl, indobaseKey)

//   // Get public rooms and their messages
//   const publicRooms = await indobase
//     .from('rooms')
//     .select(\`
//       name,
//       messages ( text )
//     \`)
//     .eq('public', true)
//   `
// const createExample = `
//   import { createClient } from '@supabase/supabase-js'

//   // Initialize
//   const indobaseUrl = 'https://chat-room.indobase.co'
//   const indobaseKey = 'public-anon-key'
//   const indobase = createClient(indobaseUrl, indobaseKey)

//   // Create a new chat room
//   const newRoom = await indobase
//     .from('rooms')
//     .insert({ name: 'IndoBase Fan Club', public: true })
//   `
// const updateExample = `
//   import { createClient } from '@supabase/supabase-js'

//   // Initialize
//   const indobaseUrl = 'https://chat-room.indobase.co'
//   const indobaseKey = 'public-anon-key'
//   const indobase = createClient(indobaseUrl, indobaseKey)

//   // Update multiple users
//   const updatedUsers = await indobase
//     .from('users')
//     .eq('account_type', 'paid')
//     .update({ highlight_color: 'gold' })
//   `
// const nodeTSExample = `
//   import { NextApiRequest, NextApiResponse } from 'next';
//   import { createClient } from '@supabase/supabase-js';

//   const indobase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.SUPABASE_SECRET_KEY
//   );

//   type User = {
//     id: string;
//     username: string;
//     status: 'ONLINE' | 'OFFLINE';
//   };

//   export default async (req: NextApiRequest, res: NextApiResponse) => {
//     const allOnlineUsers = await indobase
//       .from<User>('users')
//       .select('*')
//       .eq('status', 'ONLINE');
//     res.status(200).json(allOnlineUsers);
//   };
//   `

// const umdExample = `
//   <script src="https://unpkg.com/@supabase/supabase-js/umd/indobase.js"></script>

//   <script>
//     // Initialize
//     const indobaseUrl = 'https://chat-room.indobase.co'
//     const indobaseKey = 'public-anon-key'
//     const indobase = IndoBase.createClient(indobaseUrl, indobaseKey)

//     // Get public rooms and their messages
//     indobase
//       .from('rooms')
//       .select(\`
//         name,
//         messages ( text )
//       \`)
//       .eq('public', true)
//       .then(response => {
//         // Do something with the response
//       })
//   </script>
//   `
