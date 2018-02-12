import itchat
import json
import re
from urlparse import urlparse
from itchat.content import *

text_pattern = re.compile(r'【美团外卖】第(\d+)个领取的人红包最大！')
url_pattern = re.compile(r'https://activity.waimai.meituan.com/coupon/sharechannel/(\S+)\?')
url_start = 'https://activity.waimai.meituan.com/coupon/sharechannel'

@itchat.msg_register([TEXT, MAP, CARD, NOTE, SHARING])
def print_content(msg):
    if 'AppMsgType' in msg and msg['AppMsgType'] == 5 and msg['Url'].startswith(url_start):
        text_match = text_pattern.match(msg['Text'])
        max_red_index = text_match.group(1)

        url_match = url_pattern.match(msg['Url'])
        share_channel = url_match.group(1)

        url = urlparse(msg['Url'])
        url_key = dict([(k, v[0]) for k, v in urlparse.parse_qs(url.query).items()])['urlKey']

        print max_red_index, share_channel, url_key
    else:
        return '无法解析，请联系客服'

itchat.auto_login()
itchat.run()