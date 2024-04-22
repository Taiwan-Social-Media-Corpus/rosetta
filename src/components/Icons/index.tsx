import { IconControllerProps } from 'types';
import FacebookIcon from './Facebook';
import GithubIcon from './Github';
import LopeIcon from './Lope';

function IconController(props: IconControllerProps) {
  const { control, ...rest } = props;

  switch (control) {
    case 'facebook':
      return <FacebookIcon {...rest} />;
    case 'github':
      return <GithubIcon {...rest} />;
    case 'lope':
      return <LopeIcon {...rest} />;
    default:
      throw new Error('Invalid control');
  }
}

export default IconController;
