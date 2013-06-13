// depends on underscore.js
// http://d.hatena.ne.jp/piglovesyou/20111105/1320516029

/**
* @param {String|Number|Date} date
* @param {String=} lang 'ja' or 'en'. default is 'ja'
* @return {String}
*/
_.mixin({
  niceDate: (function(date, lang) {
    var DAY, HOUR, MINUTE, MONTH, SECOND, WEEK, YEAR, dateFormat, formatize, langs, pluralize;
    SECOND = 1000;
    MINUTE = 60 * SECOND;
    HOUR = 60 * MINUTE;
    DAY = 24 * HOUR;
    WEEK = 7 * DAY;
    MONTH = 31 * DAY;
    YEAR = 365 * DAY;
    langs = {
      en: {
        AGO: ' ago',
        AFTER: ' after',
        SECOND: ' second',
        MINUTE: ' minute',
        HOUR: ' hour',
        DAY: ' day',
        WEEK: ' week',
        MONTH: ' month',
        YEAR: ' year',
        PLURAL: 's'
      },
      ja: {
        AGO: '前',
        AFTER: '後',
        SECOND: '秒',
        MINUTE: '分',
        HOUR: '時間',
        DAY: '日',
        WEEK: '週',
        MONTH: '月',
        YEAR: '年'
      }
    };
    dateFormat = {
      en: {
        HOUR_MINUTE: "%_:%_",
        MONTH_DATE: "%_.%_",
        YEAR_MONTH_DATE: "%_.%_.%_"
      },
      ja: {
        HOUR_MINUTE: "%_:%_",
        MONTH_DATE: ["%_", langs.ja.MONTH, "%_", langs.ja.DAY].join(''),
        YEAR_MONTH_DATE: ["%_", langs.ja.YEAR, "%_", langs.ja.MONTH, "%_", langs.ja.DAY].join('')
      }
    };
    pluralize = function(num, str, lang) {
      num = Math.floor(num);
      if (lang.PLURAL && num > 1) {
        return num + str + lang.PLURAL;
      } else {
        return num + str;
      }
    };
    formatize = function() {
      var format, value, values, _i, _len;
      format = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        format = format.replace("%_", value);
      }
      return format;
    };
    return function(date, lang_) {
      var agoOrLater, dist, fmt, now;
      if (_.isString(date) || _.isNumber(date)) {
        newDate = new Date(date);
        if (isNaN(newDate)) {
          ymd = date.match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/);
          if (ymd) {
            newDate = new Date(
              ymd[1] + '/' + ymd[2] + '/' + ymd[3] + ' ' + ymd[4] + ':' + ymd[5] + ':' + ymd[6]
            );
          } else {
            newDate = date;
          }
        }
        date = newDate;
      }
      if (_.isDate(date)) {
        now = new Date().getTime();
        lang_ = _.isString(lang_) && langs[lang_] ? lang_ : "ja";
        lang = langs[lang_];
        fmt = dateFormat[lang_];
        dist = now - date.getTime();
        agoOrLater = dist > 0 ? lang.AGO : lang.AFTER;
        dist = Math.abs(dist);
        if (dist < MINUTE) {
          return "" + (pluralize(dist / SECOND, lang.SECOND, lang)) + agoOrLater;
        } else if (dist < HOUR) {
          return "" + (pluralize(dist / MINUTE, lang.MINUTE, lang)) + agoOrLater;
        } else if (dist < DAY) {
          return "" + (pluralize(dist / HOUR, lang.HOUR, lang)) + agoOrLater;
        } else if (dist < DAY * 3) {
          return "" + (pluralize(dist / DAY, lang.DAY, lang)) + agoOrLater;
        } else if (dist < YEAR) {
          return "" + (formatize(fmt.MONTH_DATE, date.getMonth() + 1, date.getDate()));
        } else {
          //return "" + (formatize(fmt.YEAR_MONTH_DATE, date.getFullYear(), date.getMonth() + 1, date.getDate()));
          return "" + (formatize(fmt.MONTH_DATE, date.getMonth() + 1, date.getDate()));
        }
      }
    };
  })()
});
