"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Meetup =
/*#__PURE__*/
function () {
  function Meetup(meetup) {
    _classCallCheck(this, Meetup);

    this.topic = meetup.topic;
    this.location = meetup.location;
    this.happeningOn = meetup.happeningOn;
    this.image = meetup.image;
  }

  _createClass(Meetup, [{
    key: "createMeetup",
    value: function () {
      var _createMeetup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var queryPlaceholder, entryValues, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryPlaceholder = "INSERT INTO meetups (topic, location, happening_on,\n      image) VALUES ($1, $2, $3, $4) RETURNING *";
                entryValues = [this.topic, this.location, this.happeningOn, this.image];
                _context.next = 4;
                return _index.default.query(queryPlaceholder, entryValues);

              case 4:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows[0]);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createMeetup() {
        return _createMeetup.apply(this, arguments);
      }

      return createMeetup;
    }()
  }], [{
    key: "retrieveAllMeetups",
    value: function () {
      var _retrieveAllMeetups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var queryPlaceholder, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryPlaceholder = 'SELECT * FROM meetups';
                _context2.next = 3;
                return _index.default.query(queryPlaceholder);

              case 3:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function retrieveAllMeetups() {
        return _retrieveAllMeetups.apply(this, arguments);
      }

      return retrieveAllMeetups;
    }()
  }, {
    key: "retrieveSingleMeetup",
    value: function () {
      var _retrieveSingleMeetup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var queryPlaceholder, queryValues, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryPlaceholder = 'SELECT * FROM meetups WHERE id = $1';
                queryValues = [id];
                _context3.next = 4;
                return _index.default.query(queryPlaceholder, queryValues);

              case 4:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows[0]);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function retrieveSingleMeetup(_x) {
        return _retrieveSingleMeetup.apply(this, arguments);
      }

      return retrieveSingleMeetup;
    }()
  }, {
    key: "retrieveUpcomingMeetups",
    value: function () {
      var _retrieveUpcomingMeetups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(currentDate) {
        var queryPlaceholder, queryValues, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                queryPlaceholder = 'SELECT * FROM meetups WHERE happening_on > $1 ORDER BY happening_on';
                queryValues = [currentDate];
                _context4.next = 4;
                return _index.default.query(queryPlaceholder, queryValues);

              case 4:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                return _context4.abrupt("return", rows);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function retrieveUpcomingMeetups(_x2) {
        return _retrieveUpcomingMeetups.apply(this, arguments);
      }

      return retrieveUpcomingMeetups;
    }()
  }, {
    key: "deleteMeetup",
    value: function () {
      var _deleteMeetup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id) {
        var queryPlaceholder, queryValues, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                queryPlaceholder = 'DELETE FROM meetups WHERE id = $1';
                queryValues = [id];
                _context5.next = 4;
                return _index.default.query(queryPlaceholder, queryValues);

              case 4:
                result = _context5.sent;
                return _context5.abrupt("return", result);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteMeetup(_x3) {
        return _deleteMeetup.apply(this, arguments);
      }

      return deleteMeetup;
    }()
  }]);

  return Meetup;
}();

var _default = Meetup;
exports.default = _default;
//# sourceMappingURL=meetup.js.map