const { useState, useEffect } = wp.element;
const { customize } = wp;
const { __ } = wp.i18n;
const { escapeHTML } = wp.escapeHtml;
import AsyncSelect from 'react-select/async'
var ajaxurl = customizerControlsObject.ajaxUrl, _wpnonce = customizerControlsObject._wpnonce;

// Multiselect categories control
export const DigitalNewspaperCategoriesMultiselect = ( props ) => {
    const [ multiselect, setMultiselect ] = useState(JSON.parse(props.value))
    const { choices } = customize.settings.controls[props.setting]
    useEffect(() => {
        customize.value( props.setting )(JSON.stringify(multiselect))
    }, [multiselect]);

    const getCategories = async (key) => {
        let categoriesArray = []
        await jQuery.ajax({
            method: 'post',
            url: ajaxurl,
            data: ({
                'action': 'digital_newspaper_get_multicheckbox_categories_simple_array',
                '_wpnonce': _wpnonce,
                'search': key
            }),
            success: function(response) {
                if(response.data) {
                    categoriesArray = response.data
                }
            }
        })
        return (categoriesArray)
    }

    const promiseOptions = (inputValue) => new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    getCategories(inputValue)
                );
            }, 1000);
    });

    return (
        <>
            { choices && 
                <AsyncSelect
                    cacheOptions
                    isMulti={true}
                    inputId="digital-newspaper-search-in-select"
                    isSearchable ={true}
                    heading={customize.settings.controls[props.setting].label}
                    placeholder={__( escapeHTML( 'Type to search . . ' ), 'digital-newspaper' )}
                    value={multiselect}
                    defaultOptions={choices}
                    loadOptions={promiseOptions}
                    onChange={ ( newMultiselect ) => setMultiselect( newMultiselect ) }
                />
            }
        </>
    )
}