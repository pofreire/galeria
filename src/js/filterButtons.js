import $ from 'jquery'

import { onLoadHtmlSuccess } from './header.js'

function filterBy(motorcycle){
    $('[wm-motorcycle]').each(function(i, e) {
        const isTarget = $(this).attr('wm-motorcycle') === motorcycle || motorcycle === null

        if(isTarget){
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(300)
        }else(
            $(this).fadeOut(300), () => {
                $(this).parent().addClass('d-none')
            }
        )
    })
}

$.fn.filterButtons = function(){
    const motorcycles = new Set
    $('[wm-motorcycle]').each(function(i, e){
        motorcycles.add($(e).attr('wm-motorcycle'))
    })

    const btns = Array.from(motorcycles).map(motorcycle => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(motorcycle)

        btn.click(e => filterBy(motorcycle))
        return btn
    })

    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('See it all')
    btnAll.click(e => filterBy(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function(){
    $('[wm-filter-buttons]').filterButtons()
})

