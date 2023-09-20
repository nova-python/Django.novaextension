(block
    (start_tag) @name
    (arguments)? @displayname
    (#set! role tag-framework)
    (#prefix! @displayname @name " ")
) @subtree

(tag
    (tag_name) @name
    (arguments)? @displayname
    (#set! role tag-framework)
    (#prefix! @displayname @name " ")
) @subtree

(variable
    (var_name) @name
    (#set! role tag)
) @subtree
