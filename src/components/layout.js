import React from "react"

import 'bootstrap/dist/css/bootstrap.css'
import '../scss/clean-blog.scss'

const Layout = (props) => (
  <>
    {props.children}
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <p className="copyright text-muted">Copyright &copy; Your Website 2019</p>
          </div>
        </div>
      </div>
    </footer>
  </>
)
export default Layout