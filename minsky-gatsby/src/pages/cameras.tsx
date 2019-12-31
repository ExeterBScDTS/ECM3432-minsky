import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import TirCanv from "../components/tircanv"

const CamerasPage = () => (
  <Layout>
            <div className="row">
                <div>
                  <img id="colour" width="320"/>
            </div>
            <TirCanv/>
            </div>
              <div>
                <canvas id="composite" width="640" height="480" />
              </div>
              <span id="temp-val"></span>
              <div>
                  Set X [<span id="val-x"></span>]
                  <input type="range" id="range-x" />
                  Set Y [<span id="val-y"></span>]
                  <input type="range" id="range-y" />
                  Set scale [<span id="val-scale"></span>]
                  <input type="range" id="range-scale" />
            </div>
  </Layout>
)

export default CamerasPage
