import Handsontable from 'handsontable';

function coverRenderer(instance, td, row, col, prop, value, cellProperties) {
    cellProperties = {};
    // #VALUE!
    if (isNaN(value)) {
      cellProperties.type = 'text';
      td.innerHTML = 'N/A';
      return td;
  }

  cellProperties.type = 'numeric';
  cellProperties.format = '0.[00]%';
  Handsontable.renderers.NumericRenderer.apply(this, arguments);
  return td;
}

const columns = [
    {
        data: 'metric',
        type: 'text',
    },
    {
        data: 'seasonyear',
        type: 'text',
    },
    {
        data: 'total_stdpremarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'total_incr_stdpremarkdown',
        renderer: coverRenderer,
        // type: 'numeric',
        // format: '0.00%',
    },
    {
        data: 'total_stdpostmarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'total_incr_stdpostmarkdown',
        renderer: coverRenderer,
        // type: 'numeric',
        // format: '0.00%',
    },
    {
        data: 'total_full',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'total_full_incr',
        renderer: coverRenderer,
    },
    {
        data: 'women_stdpremarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'women_incr_stdpremarkdown',
        renderer: coverRenderer,
    },
    {
        data: 'women_stdpostmarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'women_incr_stdpostmarkdown',
        renderer: coverRenderer,
    },
    {
        data: 'women_full',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'women_full_incr',
        renderer: coverRenderer,
    },
    {
        data: 'women_full_cont',
        type: 'numeric',
        format: '0.00%',
    },
    {
        data: 'men_stdpremarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'men_incr_stdpremarkdown',
        renderer: coverRenderer,
    },
    {
        data: 'men_stdpostmarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'men_incr_stdpostmarkdown',
        renderer: coverRenderer,
    },
    {
        data: 'men_full',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'men_full_incr',
        renderer: coverRenderer,
    },
    {
        data: 'men_full_cont',
        type: 'numeric',
        format: '0.00%',
    },
];

export default columns;
