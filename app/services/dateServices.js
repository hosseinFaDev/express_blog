const mj = require('jalali-moment');
exports.toPersianDate = (date , format = 'YYYY/MM/DD') => {
  return mj(date.created_at).locale('fa').format(format);
    
}
