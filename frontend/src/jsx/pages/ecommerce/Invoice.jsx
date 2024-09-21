import React, { Fragment } from "react";

// images
import qrcode from "../../../assets/images/qr.png";

import logoText from "../../../assets/images/logo-full.png";
import logoWhite from "../../../assets/images/logo-white.png";

const Invoice = () => {
  return (
    <Fragment>      
      <div className="row">
        <div className="col-lg-12">
          <div className="card mt-3">
            <div className="card-header">
              {" "}
              Invoice <strong>10/02/2024</strong>{" "}
              <span className="float-right">
                <strong>Status:</strong> Pending
              </span>{" "}
            </div>
            <div className="card-body">
              <div className="row mb-5">
                <div className="mt-4 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <h6>From:</h6>
                  <div>
                    {" "}
                    <strong>Webz Poland</strong>{" "}
                  </div>
                  <div>Madalinskiego 8</div>
                  <div>71-101 Szczecin, Poland</div>
                  <div>Email: info@webz.com.pl</div>
                  <div>Phone: +48 444 666 3333</div>
                </div>
                <div className="mt-4 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <h6>To:</h6>
                  <div>
                    {" "}
                    <strong>Bob Mart</strong>{" "}
                  </div>
                  <div>Attn: Daniel Marek</div>
                  <div>43-190 Mikolow, Poland</div>
                  <div>Email: marek@daniel.com</div>
                  <div>Phone: +48 123 456 789</div>
                </div>
                <div className="mt-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex justify-content-lg-end justify-content-md-strat justify-content-xs-start">
                  <div className="row align-items-center">
                    <div className="col-sm-9">                                            
                        <div className="brand-logo invoice-logo mb-3">
													<img className="logo-abbr me-2" width="110" src={logoText} alt="" />
													<img className="logo-compact" width="110" src={logoWhite} alt="" />
												</div>
                      <span>
                        Please send exact amount:{" "}
                        <strong className="d-block">0.15050000 BTC</strong>
                        <strong>1DonateWffyhwAjskoEwXt83pHZxhLTr8H</strong>
                      </span>
                      <br />
                      <small className="text-muted">
                        Current exchange rate 1BTC = $6590 USD
                      </small>
                    </div>
                    <div className="col-sm-3 mt-3">
                      {" "}
                      <img
                        src={qrcode}
                        className="img-fluid width110"
                        alt=""
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="bg-primary">
                    <tr>
                      <th className="center">#</th>
                      <th>Item</th>
                      <th>Description</th>
                      <th className="right">Unit Cost</th>
                      <th className="center">Qty</th>
                      <th className="right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="center">1</td>
                      <td className="left strong">Origin License</td>
                      <td className="left">Extended License</td>
                      <td className="right">$999,00</td>
                      <td className="center">1</td>
                      <td className="right">$999,00</td>
                    </tr>
                    <tr>
                      <td className="center">2</td>
                      <td className="left">Custom Services</td>
                      <td className="left">
                        Instalation and Customization (cost per hour)
                      </td>
                      <td className="right">$150,00</td>
                      <td className="center">20</td>
                      <td className="right">$3.000,00</td>
                    </tr>
                    <tr>
                      <td className="center">3</td>
                      <td className="left">Hosting</td>
                      <td className="left">1 year subcription</td>
                      <td className="right">$499,00</td>
                      <td className="center">1</td>
                      <td className="right">$499,00</td>
                    </tr>
                    <tr>
                      <td className="center">4</td>
                      <td className="left">Platinum Support</td>
                      <td className="left">1 year subcription 24/7</td>
                      <td className="right">$3.999,00</td>
                      <td className="center">1</td>
                      <td className="right">$3.999,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ms-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong className="text-primary">Subtotal</strong>
                        </td>
                        <td className="right">$8.497,00</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong className="text-primary">Discount (20%)</strong>
                        </td>
                        <td className="right">$1,699,40</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong className="text-primary">VAT (10%)</strong>
                        </td>
                        <td className="right">$679,76</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong className="text-primary">Total</strong>
                        </td>
                        <td className="right">
                          <strong className="text-primary">$7.477,36</strong>
                          <br />
                          <strong>0.15050000 BTC</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Invoice;
