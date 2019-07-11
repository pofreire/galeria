import $ from 'jquery'

function loadIncludes(parent){
    if (!parent)
        parent = 'body'
    console.log(parent)
    
    $(parent).find('[wm-include]').each(function(i, e){
        console.warn(e)
            const url = $(e).attr('wm-include')
            console.log(url)
            $.ajax({
                url,
                success(data){
                    $(e).html(data)
                    $(e).removeAttr('wm-include')

                    loadIncludes(e)
                }
            })
        })
}

loadIncludes()