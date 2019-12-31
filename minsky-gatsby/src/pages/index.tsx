import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"

const IndexPage = () => (
    <Layout>
        <div className="starter-template">
            <Link to="/histogram/">Histogram</Link> |
            <Link to="/cameras/">Cameras</Link>

            <div style={{visibility:'hidden',height:0}}>
              <img id="colour" width="1" height="1"/>
              <script>
              </script>
              <canvas id="thermal" width="240" height="320"></canvas>
              <script>
              </script>
            </div>            
            <div>
              <canvas className="image_cw" id="composite" width="640" height="640"></canvas>
            </div> 
          </div>
    </Layout>
)      

export default IndexPage