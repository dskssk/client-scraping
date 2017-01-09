
$(() => {
  // 小説家になろうの日間ランキングURL
  const URL = 'http://yomou.syosetu.com/rank/list/type/daily_total/';

  $.get(URL).then(data => {
   
    const $root = $(data.results[0]);
    const $ranking = $root.find('.ranking_inbox');
    const $items = $ranking.find('.ranking_list');
    
    const list: HTMLDivElement[] = [].slice.call($items);
    const infos = list.map((el: HTMLDivElement) => {
      const $el = $(el);
      const rank = parseInt($el.find('.ranking_number').text().replace(/\D+/, ''));
      const href = $el.find('.rank_h>a').attr('href');
      const title = $el.find('.rank_h>a').text();
      const char_count = parseInt($el.find('tbody>tr:nth-of-type(5) span').text().replace(/\D+/g, ''));

      return { rank, href, title, char_count };
    });

    // もっとも多い文字数の小説は？
    const no1charcount = infos.sort((a,b) => b.char_count - a.char_count)[0];
    no1charcount['name'] = 'もっとも多い文字数';

    // もっとも少ない文字数の小説は？
    const no1min = infos.sort((a,b) => a.char_count - b.char_count)[0];
    no1min['name'] = 'もっとも少ない文字数';

    riot.mount('foo-bars', {items: [no1charcount, no1min]});
    
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

