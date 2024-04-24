import { User } from 'types';
import { HeaderControl } from '../Base';
import LoginModal from './LoginModal';
import UserMenu from './Menu';

interface UserControlProps {
  user: User | null;
}

function UserControl(props: UserControlProps) {
  const { user } = props;
  return (
    <>
      {user ? (
        <UserMenu userPicture={user.picture} />
      ) : (
        <HeaderControl tooltip="Account">
          <LoginModal />
        </HeaderControl>
      )}
    </>
  );
}

export default UserControl;
