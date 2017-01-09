foo-bars
  div(each="{ item in opts.items }")
    span { item.name }
    a(href="{ item.href }") { item.title }
    span 文字数: { item.char_count } 