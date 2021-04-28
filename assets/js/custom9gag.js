// chrome.browserAction.setBadgeText({text: String('OK')});
console.log('9GAG Tooltiket active');

//Add Google Fonts
$('head').append('<link rel="preconnect" href="https://fonts.gstatic.com">');
$('head').append('<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600&display=swap" rel="stylesheet"></link>');

//Teheme dark active
$('body').addClass('theme-dark');

$('#sidebar').remove();

$(function() {
    scrollFunction();
    $('.nav-wrap .menu').click();
});

$(window).on('load', function() {
    scrollFunction();
    postStaticticsFormat();
})

$(window).scroll(function() {
    scrollFunction();
});

function scrollFunction() {
    $('.inline-ad-container').empty().hide();
    $('video').removeAttr('width');
    $('video').removeAttr('style');
    $('video').prop('controls', true);

    $('.post-container > div > div:not(.post-container)').css('height', '100%');
    postStaticticsFormat();

}

function postStaticticsFormat() {
    $('.post-meta .comment.badge-evt').each(function() {
        var comments = $(this).text().replace(/\D/g, '');
        if ($(this).closest('article').find('.comment.badge-evt .tooltipnumber').length > 0) {
            $(this).closest('article').find('.comment.badge-evt .tooltipnumber').text(comments);
        } else {
            $(this).closest('article').find('.post-afterbar-a .comment.badge-evt').append('<small class="tooltipnumber">' + comments + '</small>');
        }
    });

    $('.post-meta .point.badge-evt').each(function() {
        var likes = $(this).text().replace(/\D/g, '');
        if ($(this).closest('article').find('.btn-vote:first-child .tooltipnumber').length > 0) {
            $(this).closest('article').find('.btn-vote:first-child .tooltipnumber').text(likes);
        } else {
            $(this).closest('article').find('.post-afterbar-a > .btn-vote:first-child').append('<li class="votesnumber"><small class="tooltipnumber">' + likes + '</small></li>');
        }
    });
}

$('body').on('click', '.btn-vote.left', function() {
    postStaticticsFormat();
});

$('body').addClass('scrollbar');

$('#list-view-2').append('<div id="navigate"><div class="up">↑</div><div class="down">↓</div></div>')

$('body').on('mousemove', function() {
    scrollFunction();
})

function alignActivePost(direction) {
    if ($('article.next').length > 0) {
        var activePost = (direction == 'down') ? $('article.next').last().offset().top : $('article.next').first().offset().top;
        $('html, body').animate({ scrollTop: (activePost - 100) }, 250);
    }
}

async function detectActivePost() {
    var windowTop = Math.max($('body').scrollTop(), $('html').scrollTop());
    $('article').removeClass('active');
    $('article').removeClass('next');
    $('article').each(function(index) {
        if (windowTop > ($(this).position().top - ($(window).height() / 2))) {
            $(this).addClass('active');
        }
    });
    if ($('article.active').length > 0) {
        $('article').first().addClass('active');
    }
    return 'ok';
}

$('#page').on('click', '#navigate .up', function() {
    detectActivePost().then(function() {
        var thisPost = $('article.active').last();
        var nextPost = null;

        if (thisPost.prevAll('article').length > 0) {
            nextPost = thisPost.prevAll('article').first();
        } else {
            if (thisPost.closest('.list-stream').prev('.list-stream').find('article:last-of-type').length > 0) {
                nextPost = thisPost.closest('.list-stream').prev('.list-stream').find('article:last-of-type')
            }
        }
        nextPost != null ? nextPost.addClass('next') : '';
        alignActivePost('up');
    });
});

$('#page').on('click', '#navigate .down', function() {
    detectActivePost().then(function() {
        var thisPost = $('article.active').last();
        var nextPost = null;

        if (thisPost.nextAll('article').length > 0) {
            nextPost = thisPost.nextAll('article').first()
        } else {
            if (thisPost.closest('.list-stream').next('.list-stream').find('article:first-of-type').length > 0) {
                nextPost = thisPost.closest('.list-stream').next('.list-stream').find('article:first-of-type');
            }
        }
        nextPost != null ? nextPost.addClass('next') : '';
        alignActivePost('down');
    });
});