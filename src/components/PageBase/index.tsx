import cx from 'clsx';
import classes from './PageBase.module.css';

interface PageBaseProps extends React.ComponentPropsWithoutRef<'div'> {}

function PageBase(props: PageBaseProps) {
  const { className, children, ...rest } = props;
  return (
    <div className={classes.container}>
      <div className={cx(classes.wrapper, className)} {...rest}>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
}

export default PageBase;
