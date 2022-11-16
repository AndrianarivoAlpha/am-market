export const formatNumber = ( number ) =>
{
  const fomatedNumber = new Intl.NumberFormat().format( number )
  return fomatedNumber
};
export const formatCurrency = ( number, currency ) =>
{
  const formatedCurrency = new Intl.NumberFormat( 'us-EN', { style: 'currency', currency: currency } ).format( number );
  return formatedCurrency
}

export const timeConverter = ( UNIX_timestamp ) =>
{
  var a = new Date( UNIX_timestamp * 1000 );
  var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  var year = a.getFullYear();
  var month = months[ a.getMonth() ];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}