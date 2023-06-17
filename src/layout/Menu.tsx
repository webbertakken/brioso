import styles from './Menu.module.css'
import { Link } from 'react-router-dom'

interface Props {}

const Menu = ({}: Props): JSX.Element => {
  return (
    <nav>
      <ul className={styles.menu}>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={`/practice`}>Practice</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
