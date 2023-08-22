import { useSession } from 'next-auth/react';

function ProfilePage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        <p>Your user ID: {session.user.id}</p>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default ProfilePage;
