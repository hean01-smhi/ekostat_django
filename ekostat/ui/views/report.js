import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import Chart from 'react-chartjs';

const Report = () => (
  <section>
    <h1>
      <FormattedMessage id="report.heading" defaultMessage="Report" />
    </h1>

    <div className="report-details">
      <dl>
        <dt>Water district</dt>
        <dd>Bottenhavet</dd>
      </dl>
      <dl>
        <dt>Type</dt>
        <dd>16</dd>
        <dd>17</dd>
      </dl>
      <dl>
        <dt>Water bodies</dt>
        <dd>WB 1</dd>
        <dd>WB 2</dd>
        <dd>WB 3</dd>
        <dd>WB 4</dd>
      </dl>
      <dl>
        <dt>Period</dt>
        <dd>2012 - 2017</dd>
        <dd>2006 - 2011</dd>
      </dl>
    </div>

    <div className="report-table">
      <table>
        <tbody>
          <tr>
            <th className="report-table-heading-1">Water body</th>
            <td colSpan="2">WB 1</td>
            <td colSpan="2">WB 2</td>
          </tr>
          <tr>
            <th className="report-table-heading-1">Period</th>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <th className="report-table-heading-1">Ecological status</th>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-2">Biological elements</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-3">Phytoplankton</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">Chlorophyll - default</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">Biovolume - default</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-2"><span>2</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">Chlorophyll -* model</th>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-3">Benthic fauna</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">BQI - default</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">BQI -* extrapolation</th>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-3">Vegetation</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">MSMDI - default</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">Eelgrass -* depthlimit</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-2">Supporting elements</th>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-3">Nutrients</th>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">N, winter - default</th>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">N, summer - default</th>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-2"><span>2</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">P, winter - default</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-2"><span>2</span></td>
          </tr>
          <tr>
            <th className="report-table-heading-4">P, summer - default</th>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
            <td className="report-table-status-1"><span>1</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="report-chart">

      <Chart.Bar data={{
        labels: ["B", "P", "M", "G", "H"],
        datasets: [{"data": [0,0.05,0.07,0.75,0.12]}]
      }} options={{responsive: true}} />

      <Chart.Line data={{
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [{"data": [0.76,0.72,0.8,0.79,0.77,0.71,0.73,0.71,0.725,0.775,0.715,0.73]}]
      }} options={{datasetFill: false, responsive: true}} />

    </div>
  </section>
);

export {Report}
