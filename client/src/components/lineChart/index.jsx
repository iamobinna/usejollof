import './styles/style.css';
import { Line } from 'react-chartjs-2';

const Index = ({dataValues, chartTitle, showFrom}) => {
    const getWeekDateArray = function(end) {

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const limit = showFrom? showFrom : 7;

        let
          arr = new [](),
          dt = new Date(end),
          day = 0; 
      
        while (day < limit) {
          arr.unshift( monthNames[dt.getMonth()] + ' ' + dt.getDate());
          dt.setDate(dt.getDate() - 1);
          day++;
        }
      
        return arr;
      
      }
    // var startDate = new Date("2017-10-01"); //YYYY-MM-DD
    var endDate = new Date(); //YYYY-MM-DD

    const dateArr = getWeekDateArray( endDate);
    const data = {
        labels: dateArr,
        datasets: [
          {
            label: chartTitle,
            data: dataValues,
            fill: false,
            backgroundColor: 'rgb(0, 150, 255)',
            borderColor: 'rgba(0, 150, 255,0.2)',
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    return (
        <Line data={data} options={options} />
    )
}

export default Index
