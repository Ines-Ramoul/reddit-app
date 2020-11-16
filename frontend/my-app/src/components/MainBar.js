import {Navbar, Nav} from 'react-bootstrap';
import AuthContext from '../context/auth-context';



const mainBar = props => (
<AuthContext.Consumer>
  {(context) => 
<Navbar bg="dark" variant="dark" expand="lg">
  <Navbar.Brand href="/">Subreddits</Navbar.Brand>
 {!context.token && 
  <Nav.Link href="/">Authentification</Nav.Link> }
 {context.token &&
 <Nav.Link href="/subreddits">Search subreddits</Nav.Link> }
{context.token &&
  <Navbar.Collapse id="basic-navbar-nav">
   
  <Navbar.Text>
      Signed in 
  </Navbar.Text>
  </Navbar.Collapse>}
</Navbar>  
}
</AuthContext.Consumer>  
);

export default mainBar;