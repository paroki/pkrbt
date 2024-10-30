import { User } from "@pkrbt/directus";

export default function ProfileForm({ user }: { user: User }) {
  return (
    <div>
      <h1>{user.nama ? user.nama : `${user.first_name} ${user.last_name}`}</h1>
    </div>
  );
}
