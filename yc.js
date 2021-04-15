
(function() {
    var yc = (function() {
        var def_options = {
            autoplay: false,
            user: null,
            carousel: create_carousel,
            player: create_player,
            thumbnail: create_thumbnail,
            loaded: function() {},
            playopts: {
                autoplay: 0,
                egm: 1,
                autohide: 1,
                fs: 1,
                showinfo: 1
            },
            max: 50
        };
        
        this.max = 10;
        
        function create_player(jqe, video, options) {
            var ifr = $('iframe', jqe);
            if (ifr.length === 0) {
                ifr = $('<iframe scrolling="no">');
                ifr.addClass('player');
            }
            var src = 'http://www.youtube.com/embed/' + video.id;
            if (options.playopts) {
                src += '?';
                for (var k in options.playopts) {
                    src += k + '=' + options.playopts[k] + '&';
                }
                src += '_a=b';
            }
            ifr.attr('src', src);
            jqe.append(ifr);
        }
        
        function create_carousel(jqe, videos, options) {
            var car = $('div.carousel', jqe);
            
            if (car.length === 0) {
                car = $('<div>');
                car.addClass('carousel');
                jqe.append(car);
            }
            
            $.each(videos, function(i, video) {
                options.thumbnail(car, video, options);
            });
        }
        
        function create_thumbnail(jqe, video, options) {
            var imgurl = video.thumbnails[0].url;
            var img = $('img[src="' + imgurl + '"]');
            var desc;
            var container;
            
            if (img.length !== 0) return;
            img = $('<img align="left">');
            img.addClass('thumbnail');
            jqe.append(img);
            img.attr('src', imgurl);
            img.attr('title', video.title);
            img.click(function() {
                options.player(options.maindiv, video, $.extend(true, {}, options, {
                    playopts: {
                        autoplay: 1
                    }
                }));
            });
            
            desk = $('<p class="yt-descript">' + video.title + '</p>');
            jqe.append(desk);
            desk.click(function() {
                options.player(options.maindiv, video, $.extend(true, {}, options, {
                    playopts: {
                        autoplay: 1
                    }
                }));
            });
        }
    
        this.init = function(options) {
            var allopts = $.extend(true, {}, def_options, options);
                var md = $(this);
                md.addClass('youtube');
                md.addClass('youtube-channel');
                allopts.maindiv = md;
                
                $.getJSON('http://gdata.youtube.com/feeds/users/' + allopts.user + '/uploads?alt=json-in-script&format=5&callback=?&max-results='+allopts.max, null, function(data) {
                    var feed = data.feed;
                    var videos = [];
                    $.each(feed.entry, function(i, entry) {
    
                        var video = {
                            title: entry.title.$t,
                            id: entry.id.$t.match('[^/]*$'),
                            thumbnails: entry.media$group.media$thumbnail
                        };
                        videos.push(video);
                    });
                    allopts.allvideos = videos;
                    allopts.carousel(md, videos, allopts);
                    allopts.player(md, videos[0], allopts);
                    allopts.loaded(videos, allopts);
                });
        }
            
        return this;
    }());

    $.fn.extend({
        youtube_channel: yc.init
    });
})();

$(function() {
    var channel = $('#youtube-channel').attr('channel');
    var max = $('#youtube-channel').attr('max');
    
    $('#youtube-channel').youtube_channel({
        user: channel,
        max: max
    });
});
