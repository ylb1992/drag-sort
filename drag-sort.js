(function($) {
    'use strict';
    $.fn.dragSort = function(options) {
        var settings = $.extend(true, {
            targetEle: 'li',
            replaceStyle: {
                'background-color': '#f9f9f9',
                'border': '1px dashed #ddd'
            },
            dragStyle: {
                'position': 'fixed',
                'box-shadow': '10px 10px 20px 0 #eee'
            }
        }, options);

        return this.each(function() {
            var thisEle = $(this);
            thisEle.on('mousedown.dragSort', settings.targetEle, function(event) {

                var selfEle = $(this);

                // 只允许鼠标左键拖动
                if(event.which !== 1) {
                    return;
                }

                // 禁止在表单元素里面拖动
                var tagName = event.target.tagName.toUpperCase();
                if(tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
                    return;
                }

                var moveEle = $(this);

                var offset = selfEle.offset();
                var rangeX = event.pageX - offset.left;
                var rangeY = event.pageY - offset.top;

                var replaceEle = selfEle.clone()
                    .css('height', selfEle.outerHeight())
                    .css(settings.replaceStyle)
                    .empty();
                settings.dragStyle.width = selfEle.width();
                var move = true;

                $(document).on('mousemove.dragSort', function(event) {
                    if (move) {
                        moveEle.before(replaceEle).css(settings.dragStyle).appendTo(moveEle.parent());
                        move = false;
                    }

                    var thisOuterHeight = moveEle.outerHeight();

                    // 滚动条的位置
                    var scrollTop = $(document).scrollTop();
                    var scrollLeft = $(document).scrollLeft();


                    var moveLeft = event.pageX - rangeX - scrollLeft;
                    var moveTop = event.pageY - rangeY - scrollTop;



                    var prevEle = replaceEle.prev();
                    var nextEle = replaceEle.next().not(moveEle);

                    moveEle.css({
                        left: moveLeft,
                        top: moveTop
                    });


                    if (prevEle.length > 0 && moveTop + scrollTop < prevEle.offset().top + prevEle.outerHeight() / 2) { // 向上排序
                        replaceEle.after(prevEle);
                    } else if (nextEle.length > 0 && moveTop + scrollTop > nextEle.offset().top - nextEle.outerHeight() / 2) { //向下排序
                        replaceEle.before(nextEle);
                    }
                });

                $(document).on('mouseup.dragSort', function(event) {
                    $(document).off('mousemove.dragSort mouseup.dragSort')
                    if (!move) {
                        replaceEle.before(moveEle.removeAttr('style')).remove();
                    }
                });
            });
        });
    };
})(jQuery)