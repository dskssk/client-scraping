$(function () {
    // 小説家になろうの日間ランキングURL
    var URL = 'http://yomou.syosetu.com/rank/list/type/daily_total/';
    var get_start = Date.now();
    $.get(URL).then(function (data) {
        var get_end = Date.now();
        alert("get_time: " + (get_end - get_start) + "\u30DF\u30EA\u79D2");
        var $root = $(data.results[0]);
        var $ranking = $root.find('.ranking_inbox');
        var $items = $ranking.find('.ranking_list');
        var list = [].slice.call($items);
        var infos = list.map(function (el) {
            var $el = $(el);
            var rank = parseInt($el.find('.ranking_number').text().replace(/\D+/, ''));
            var href = $el.find('.rank_h>a').attr('href');
            var title = $el.find('.rank_h>a').text();
            var char_count = parseInt($el.find('tbody>tr:nth-of-type(5) span').text().replace(/\D+/g, ''));
            return { rank: rank, href: href, title: title, char_count: char_count };
        });
        // もっとも多い文字数の小説は？
        var no1charcount = infos.sort(function (a, b) { return b.char_count - a.char_count; })[0];
        alert("\u3082\u3063\u3068\u3082\u591A\u3044\u6587\u5B57\u6570: " + no1charcount.rank + "\u4F4D, " + no1charcount.title + ": " + no1charcount.char_count);
        // もっとも少ない文字数の小説は？
        var no1min = infos.sort(function (a, b) { return a.char_count - b.char_count; })[0];
        alert("\u3082\u3063\u3068\u3082\u5C11\u306A\u3044\u6587\u5B57\u6570: " + no1min.rank + "\u4F4D, " + no1min.title + ": " + no1min.char_count);
        /*
    
        // 各順位のデータ情報は以下。
        interface Info {
          title: string; // タイトル
          author: Author; // 作者
          point: number; // ポイント
          type: Type; // タイプ(連載・短編など)
    
    
        }
        // 作者情報
        // クラスのほうがよさそう。
        interface Author {
          name: string;
          id: string; // numberっぽいけど念の為stringで持つ
        }
        
    
        // enumはSymbol使ったほうが良いがbabel通すのが面倒臭いので
        // とりあえずこのまま。async awaitも使いたいしbabel導入するか。。。？
    
        // タイプ
        enum Type {
          SERIALIZING, // 連載中
          COMPLETION, // 完結済み
          SHORT // 短編
        }
    
        alert($root.find('h1')[0].textContent);
        */
    });
});
