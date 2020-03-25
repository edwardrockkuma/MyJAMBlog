import React from "react"

import 'bootstrap/dist/css/bootstrap.css'
import '../scss/clean-blog.scss'
import './all.sass'
import Navbar from '../components/Navbar'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'

const Layout = (props) => (
  <>    
    <Navbar />
    {props.children}
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <p className="copyright text-muted">Copyright &copy; Cappuccino Code WebSite 2020</p>
          </div>
        </div>
      </div>
    </footer>
  </>
)
export default Layout