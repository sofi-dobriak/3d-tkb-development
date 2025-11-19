// Підключення бібліотеки для роботи з даними
import c3 from 'c3'; // Підключення бібліотеки для створення графіків
import { format, parse, parseISO } from 'date-fns';
import { numberWithCommas } from '../../helpers/helpers_s3d2';

export default function priceHistoryGraphic(prices, i18n, elementId) {
  var data = {
    columns: [
        ['Дані 1', ...prices.map(el => el.price_uah)], 
    ],
    labels: {
        format: {
            // 'Дані 1': d3.format('$'),
            'Дані 1': function (v, id, i, j) { return numberWithCommas(v) + ' $'; },
        }
    },
    type: 'bar' // Тип графіка - стовпчиковий
};

  // Опції графіка
  var options = {
      bindto: document.getElementById(elementId), // Ідентифікатор контейнера для графіка
      axis: {
          x: {
              type: 'category',
              _comment: "THIS IS WHERE YOU SET YOUR CATEGORY LABELS",
              tick: {
                multiline: true,
                width:  100,
                height: 150
              },
              categories: [...prices.map(el => {
                return `${i18n.t('monthes.'+format(parseISO(el.date), 'MMMM'))} 

                ${format(parseISO(el.date), 'yyyy')}`;
              })]
          },
          y: {
            show: false,
          }
      },
      bar: {
          width: 20
      },
      tooltip: {
          show: false,
          format: {
              title: function (d) { return 'Категорія ' + d; }
          }
      },
      legend: {
          show: false
      }
  };

  return c3.generate({
      data: data,
      axis: options.axis,
      bar: options.bar,
      tooltip: options.tooltip,
      color: {
          pattern: ['var(--color-surface-brand-800)'],
      },
      grid: {
        y: {
          show: true
        },
      },
      legend: {
        show: false
      },
  });
}