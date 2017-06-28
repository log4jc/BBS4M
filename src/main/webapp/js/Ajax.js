/**
 * Created by Jason on 21/06/2017.
 */
function getReplyContent(varThis,replyContentid) {
    $.ajax({
        url: '/ajax/replyContentList.do',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'id': replyContentid
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                var varBlock = '';
                var varList = '';
                varBlock = varBlock + '<span class="out-triangle" ></span>' +
                '<span class="reply-area-content">' +
                '<ul>' ;

                for (var i = 0; i < json.length; i++) {
                    varList = varList + '<li class="reply-area-core-content-list">' +
                        '<div class="reply-area-core-content">' +
                        '<div class="reply-area-content-title">' +
                        '<span class="reply-area-content-title-left">' +
                        '<span class="reply-area-content-title-avater">' +
                        '<img src="/images/getAvator.do?id=' + json[i].creater +'" />' +
                        '</span>' +
                        '<span class="reply-area-content-title-person">' + json[i].userAttribute.userName + '</span>' +
                        '</span>' +
                        '<span class="reply-area-content-title-right">' +
                        '<span class="reply-area-content-title-right-time">' + json[i].createTime + '</span>' +
                        '<span class="reply-area-content-title-right-reply-button">回复</span>' +
                        '</span>' +
                        '</div>' +
                        '<div class="reply-area-content-content">' +
                        json[i].content +
                        '</div>' +
                            '<input type="hidden" id="ReplyContentList" name="ReplyContentList" value="' + json[i].creater +'" />' +
                        '</div>' +
                        '</li>' ;
                }
                varBlock = varBlock + varList;

                varBlock = varBlock + '</ul>' +
                '<span class="reply-area-content-reply-content">' +
                '<div class="reply-area-content-content-textarea">' +
                '<textarea name="reply-content" id="reply-content" ></textarea>' +
                '</div>' +
                '<div class="reply-area-content-button">' +
                '<span class="reply-area-content-button-left">' +
                '<button>取消</button>' +
                '</span>' +
                '<span class="reply-area-content-button-right">' +
                '<button>评论</button>' +
                '</span>' +
                '</div>' +
                '</span>' +
                '</span>'



                varThis.parent().parent().next().html(varBlock);
            }


        },
        error: function (json) {
            alert("Request Error!")
        }
    })
}

function getLoadTheme(currentPage) {
    $.ajax({
        url: '/ajax/themeList.do',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'currentPage': currentPage
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                var listTheme = '';
                for (var i = 0; i < json.length; i++) {
                    listTheme = listTheme +
                        '<li class="forum-list">' +
                        '<div class="forum-list-content">' +
                        '<div class="forum-list-content-title">' +
                        '<span class="reply-avator">' +
                        '<img src="/images/getAvator.do?id=' + json[i].lastReplyContent.creater + '" alt="avator"/>' +
                        '</span>' +
                        '<span class="reply-person">' +
                        json[i].lastReplyContent.userName +
                        '</span>' +
                        '回复了问题' +
                        '<span class="reply-time">' +
                        json[i].differentTime +
                        '</span>' +
                        '</div>' +
                        '<div class="forum-topic">' +
                        '<span class="forum-topic-static">来自话题</span>';

                    for (var k = 0; k < json[i].topicIncludes.length; k++) {
                        listTheme = listTheme + '<span class="forum-topic-dynamic">' + json[i].topicIncludes[k].topicName + '</span>' ;
                    }
                    listTheme = listTheme +
                        '</div>' +
                        '<div class="forum-list-content-detail">' +
                        '<div class="forum-list-content-theme">' +
                        '<a href="/forum/fourmDetail.do?id=' + json[i].id + '">' + json[i].themeContent + '</a>' +
                        '</div>' +
                        '<div class="forum-list-content-content">' +
                        json[i].firstForumContent.content
                    '</div>' ;
                    if (json[i].firstForumContent.picFlag == 'Y') {
                        listTheme = listTheme +
                            '<div class="forum-list-content-pic">' +
                            '<img src="/images/getForumPic.do?id=' + json[i].firstForumContent.picId + '" alt="forumPic"/>' +
                            '</div>' ;
                    }
                    listTheme = listTheme +
                        '</div>' +
                        '<div class="forum-list-content-footer">' +
                        '<span class="reply-count">回复: ' + json[i].replyCount + '</span>' +
                        '<span class="follow-count">关注: ' + json[i].followThemes.length + '</span>' +
                        '<span class="browse-count">浏览: ' + json[i].browse + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</li>' ;
                }

                $(".forum-core ul").append(listTheme);
                $("#currentPage").val(parseInt($("#currentPage").val()) + 1);
                $(".reload-bar").attr("href","#" + $("#currentPage").val());
            }


        },
        error: function (json) {
            alert("Request Error!")
        }
    })
}

function getLoadButtonFlag(currentPage, object, themeId) {
    $.ajax({
        url: '/ajax/getLoadButtonFlag.do',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'currentPage': currentPage,
            'object': object,
            'Id' : themeId
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                if (json.flag == 'Y') {
                } else {
                    $(".reload-bar").remove();
                }


            }


        },
        error: function (json) {
            alert("Request Error!")
        }
    })
}

function getLoadContent(currentPage) {
    $.ajax({
        url: '/ajax/contentList.do',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'currentPage': currentPage,
            'themeId': $("#themeId").val()
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                var listContent = '';
                for (var i = 0; i < json.length; i++) {
                    listContent = listContent +
                        '<li class="reply-content-detail-list">' +
                        '<div class="reply-personal-title">' +
                        '<span class="reply-personal-avator">' +
                        '<img src="/images/getAvator.do?id=' + json[i].creater + '" alt="avator"/>' +
                        '</span>' +
                        '<span class="reply-person">' +
                        json[i].userName +
                        '</span>' +
                        '</div>' +
                        '<div class="reply-content-detail">' +
                        '<div class="reply-content-detail-word">' +
                        json[i].content +
                        '</div>'
                    if(json[i].picFlag == 'Y') {
                        log(json[i].picFlag);
                        listContent = listContent +
                            '<div class="reply-content-detail-img">' +
                            '<img src="/images/getForumPic.do?id=' + json[i].picId + '" alt="forumPic"/>' +
                            '</div>'
                    }
                    listContent = listContent +
                        '</div>' +
                        '<div class="reply-content-footer">' +
                        '<div class="reply-content-tool">' +
                        '<span class="reply-content-tool-support">赞 ' + json[i].likeCount + '</span>' +
                        '<span class="reply-content-tool-nonsupport">踩 ' + json[i].dislikeCount + '</span>' +
                        '<span class="reply-content-tool-reply">回复 ' + json[i].replyCount + '</span>' +
                        '<input type="hidden" id="replyContentId" value="' + json[i].id + '" />' +
                        '</div>' +
                        '<div class="reply-content-time">' + json[i].createTime + '</div>' +
                        '</div>' +
                        '<div class="reply-area"></div>' +
                        '</li>'

                }

                $(".reply-content ul").append(listContent);
                $("#currentPage").val(parseInt($("#currentPage").val()) + 1);
            }


        },
        error: function (json) {
            alert("Request Error!")
        }
    })
}