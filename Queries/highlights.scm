(string) @string
(keyword) @keyword
(operator) @operator
(keyword_operator) @keyword.operator
(boolean) @value.boolean
(number) @value.number
(comment) @comment
(builtin) @identifier.global
(identifier) @identifier.variable

(tag (tag_name) @tag.framework)
(block (start_tag) @tag.framework)
(block (end_tag) @tag.framework)
(filter (filter_name) @identifier.function)

(block
    (start_tag) @tag.framework
    (body (text)) @comment
    (#eq? @tag.framework "comment")
)

["{{" "}}" "{%" "%}"] @bracket
