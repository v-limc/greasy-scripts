async function batchModifyVisible(pageNum) {
    console.log("page %s", pageNum)
    // if (pageNum > 30) {
    //     return false;
    // }

    // https://weibo.com/ajax/statuses/mymblog?uid=1769430910&page=5&feature=0&since_id=4305117857715983
    let mymblog = await (await fetch("https://weibo.com/ajax/statuses/mymblog?uid=1769430910&page=" + pageNum + "&feature=0", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "traceparent": "00-ea1faf865aa35ad00cf9c51f7cbdad40-5aaaeea47a3bb2ab-00",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest",
            "x-xsrf-token": "It-cqJeJU45HTLCplxTRsIWr"
        },
        "referrer": "https://weibo.com/u/1769430910",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    })).json();

    let blogs = mymblog.data.list;
    if (blogs.length > 0) {

        for (const blog of blogs) {

            if (blog.id != 4720581318545426 && blog.visible.type == 0) {

                fetch("https://weibo.com/ajax/statuses/modifyVisible", {
                        "headers": {
                            "accept": "application/json, text/plain, */*",
                            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
                            "content-type": "application/json;charset=UTF-8",
                            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "traceparent": "00-7703a61511a7383f1b2a360d93ff4865-3710553e15d7e77a-00",
                            "x-kl-ajax-request": "Ajax_Request",
                            "x-requested-with": "XMLHttpRequest",
                            "x-xsrf-token": "It-cqJeJU45HTLCplxTRsIWr"
                        },
                        "referrer": "https://weibo.com/u/1769430910",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": "{\"ids\":\"" + blog.id + "\",\"visible\":\"1\"}",
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    })
                    .then(function (response) {
                        if (response.status != 200) {
                            console.log(blog.id, blog.text, blog)
                        }
                    })
                    .catch(function (error) {
                        console.log(blog.id, blog.text, blog)
                    });
            }
        }
        return true
    }

    return false
}

let i = 0;

while (true) {
    if (!await batchModifyVisible(i)) {
        break;
    }
    i++;
}


function aaa() {
    fetch("https://weibo.com/ajax/statuses/destroy", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "traceparent": "00-f3518d4779de294b1441708bd8c4b345-b802c6c2b5492e5a-00",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest",
            "x-xsrf-token": "It-cqJeJU45HTLCplxTRsIWr"
        },
        "referrer": "https://weibo.com/u/1769430910",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"id\":\"4479109729905436\"}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    // https://weibo.com/1769430910/L8DpFzR3s

    /* 
    {
        "visible": {
            "type": 0,
            "list_id": 0
        },
        "created_at": "Wed Sep 18 13:15:53 +0800 2019",
        "id": 4417861625776206,
        "idstr": "4417861625776206",
        "mid": "4417861625776206",
        "mblogid": "I7uF4oeEC",
        "user": {
            "id": 1769430910,
            "idstr": "1769430910",
            "pc_new": 7,
            "screen_name": "嗡嗡嗡嗡你说啥",
            "profile_image_url": "https://tvax2.sinaimg.cn/crop.0.0.750.750.50/69775f7ely8fthra4dqhqj20ku0kudgs.jpg?KID=imgbed,tva&Expires=1640975442&ssig=4LYtJbzzLW",
            "profile_url": "/u/1769430910",
            "verified": false,
            "verified_type": -1,
            "domain": "mightyvincent",
            "weihao": "",
            "avatar_large": "https://tvax2.sinaimg.cn/crop.0.0.750.750.180/69775f7ely8fthra4dqhqj20ku0kudgs.jpg?KID=imgbed,tva&Expires=1640975442&ssig=Nfok3BlYRc",
            "avatar_hd": "https://tvax2.sinaimg.cn/crop.0.0.750.750.1024/69775f7ely8fthra4dqhqj20ku0kudgs.jpg?KID=imgbed,tva&Expires=1640975442&ssig=y7r%2BrnO7oR",
            "follow_me": false,
            "following": false,
            "mbrank": 0,
            "mbtype": 0,
            "planet_video": false
        },
        "can_edit": false,
        "text_raw": "转发微博",
        "text": "转发微博",
        "source": "红米Note7 4800万相机",
        "favorited": false,
        "rid": "6_0_50_6667899661483869288_0_0_0",
        "reads_count": 30,
        "pic_ids": [],
        "geo": "",
        "pic_num": 0,
        "is_paid": false,
        "mblog_vip_type": 0,
        "number_display_strategy": {
            "apply_scenario_flag": 3,
            "display_text_min_number": 1000000,
            "display_text": "100万+"
        },
        "reposts_count": 0,
        "comments_count": 0,
        "attitudes_count": 0,
        "attitudes_status": 0,
        "isLongText": false,
        "mlevel": 2,
        "content_auth": 0,
        "is_show_bulletin": 2,
        "comment_manage_info": {
            "comment_manage_button": 1,
            "comment_permission_type": 1,
            "approval_comment_type": 0,
            "comment_sort_type": 0
        },
        "share_repost_type": 2,
        "mblogtype": 0,
        "showFeedRepost": false,
        "showFeedComment": false,
        "rcList": [],
        "retweeted_status": {
            "visible": {
                "type": 0,
                "list_id": 0
            },
            "created_at": "Wed Sep 18 12:03:03 +0800 2019",
            "id": 4417843292323593,
            "idstr": "4417843292323593",
            "mid": "4417843292323593",
            "mblogid": "I7ubv9Ktj",
            "user": null,
            "text_raw": "抱歉，此微博已被作者删除。查看帮助：http://t.cn/Rfd3rQV",
            "text": "抱歉，此微博已被作者删除。查看帮助：<a target=\"_blank\" href=\"http://t.cn/Rfd3rQV\"><img class=\"icon-link\" src=\"https://h5.sinaimg.cn/upload/2015/09/25/3/timeline_card_small_web_default.png\"/>网页链接</a>",
            "attitudes_status": 0,
            "mlevel": 2,
            "deleted": "1",
            "showFeedRepost": false,
            "showFeedComment": false,
            "rcList": []
        }
    }
    */

}