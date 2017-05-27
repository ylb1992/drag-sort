/**
 * dragSort seajs module
 *
 * @param
 *    ele (DOM Selector, DOM Object, or jQuery DOM Object): 需要排序元素的父容器
 *    targetEle (DOM Selector): 排序元素的DOM选择器字符串，默认li
 *
 * @return Class
 *
 * @example
 *    var DragSort = require('./ui/drag-sort');
 *    DragSort($('#picList'), {
 *	      targetEle: '.li'
 *	  });
 *
 * @author 阿伦<https://github.com/ylb1992/drag-sort>
 */

define(function(require) {
	'use strict';

	function DragSort(ele, opts) {
		this.rootEle = $(ele);

		this.opts = $.extend(true, {
			targetEle: 'li',
			replaceStyle: {
				'background-color': '#f9f9f9',
				'border': '1px dashed #ddd'
			},
			dragStyle: {
				'position': 'fixed',
				'box-shadow': '10px 10px 20px 0 #eee'
			}
		}, opts)

		this._init();
	}

	DragSort.prototype = {
		constructor: DragSort,

		_init: function() {
			// 记录鼠标在目标元素内的偏移坐标
			this.range = {
				x: 0,
				y: 0
			};

			// 补位元素
			this.replaceEle = null;
			this.moveEle = null;

			// 是否可以移动
			this.move = false;

			this._bindMouseDown();
		},

		_bindMouseDown: function() {
			var self = this;
			self.rootEle.on('mousedown', self.opts.targetEle, function(event) {
				var thisEle = $(this);

				//只允许鼠标左键拖动
				if (event.which != 1) {
					return;
				}

				// 在表单元素里面拖动无效
				var tagName = event.target.tagName.toUpperCase();
				if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
					return;
				}

				self.moveEle = thisEle;

				var offset = thisEle.offset();
				self.range.x = event.pageX - offset.left;
				self.range.y = event.pageY - offset.top;

				self.replaceEle = thisEle.clone()
					.css('height', thisEle.outerHeight())
					.css(self.opts.replaceStyle)
					.empty();
				self.opts.dragStyle.width = thisEle.width();
				self.move = true;

				self._bindMouseMove();
				self._bindMouseUp();

			});
		},

		_bindMouseMove: function() {
			var self = this;
			$(document).on('mousemove.dragSort', function(event) {
				if (self.move) {
					self.moveEle.before(self.replaceEle).css(self.opts.dragStyle).appendTo(self.moveEle.parent());
					self.move = false;
				}

				var thisOuterHeight = self.moveEle.outerHeight();

				// 滚动条的位置
				var scrollTop = $(document).scrollTop();
				var scrollLeft = $(document).scrollLeft();


				var moveLeft = event.pageX - self.range.x - scrollLeft;
				var moveTop = event.pageY - self.range.y - scrollTop;



				var prevEle = self.replaceEle.prev();
				var nextEle = self.replaceEle.next().not(self.moveEle);

				self.moveEle.css({
					left: moveLeft,
					top: moveTop
				});


				if (prevEle.length > 0 && moveTop + scrollTop < prevEle.offset().top + prevEle.outerHeight() / 2) { // 向上排序
					self.replaceEle.after(prevEle);
				} else if (nextEle.length > 0 && moveTop + scrollTop > nextEle.offset().top - nextEle.outerHeight() / 2) { //向下排序
					self.replaceEle.before(nextEle);
				}

				// TODO 暂时未考虑父元素滚动的情况

			});
		},

		_bindMouseUp: function() {
			var self = this;
			$(document).on('mouseup.dragSort', function() {

				$(document).off('mousemove.dragSort mouseup.dragSort')
				if (!self.move) {
					self.replaceEle.before(self.moveEle.removeAttr('style')).remove();
				}
			});
		}
	}

	return function(ele, opts) {
		return new DragSort(ele, opts);
	}

})