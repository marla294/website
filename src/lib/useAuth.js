import { useState } from 'react';

export default function useAuth(initial = {}) {
  const [auth, setAuth] = useState(initial);

  return {
    auth,
    setAuth,
  }
}