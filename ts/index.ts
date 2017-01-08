
$(() => {
  // 小説家になろうの日間ランキングURL
  const URL = 'http://yomou.syosetu.com/rank/list/type/daily_total/';
  const get_start = Date.now();
  
  $.get(URL).then(data => {
    const get_end = Date.now();
    alert(`get_time: ${get_end - get_start }ミリ秒`);
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
    alert(`もっとも多い文字数: ${no1charcount.rank}位, ${no1charcount.title}: ${ no1charcount.char_count}`);

    // もっとも少ない文字数の小説は？
    const no1min = infos.sort((a,b) => a.char_count - b.char_count)[0];
    alert(`もっとも少ない文字数: ${no1min.rank}位, ${no1min.title}: ${ no1min.char_count}`);

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

