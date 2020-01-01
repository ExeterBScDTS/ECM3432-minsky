import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import TirCanv from "../components/tircanv"
import RgbCanv from "../components/rgbcanv"
import Composite from "../components/composite"


const CamerasPage = () => (
  <Layout>
            <div className="row">
              <RgbCanv id="rgb" />
              <TirCanv/>
            </div>
              <div>
                <Composite/>
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
