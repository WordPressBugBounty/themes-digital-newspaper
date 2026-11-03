const { ColorPicker, ColorIndicator, Dropdown, SelectControl } = wp.components;
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
const { useState, useEffect } = wp.element;
const { escapeHTML } = wp.escapeHtml;
const { __ } = wp.i18n;
const { customize } = wp;
import { Tooltip } from 'react-tooltip'

export const DigitalNewspaperBorder = ( props ) =>  {
    const [ border, setBorder ] = useState(props.value)
    const [ type, setType ] = useState(border.type)
    const [ color, setColor ] = useState(border.color)
    const [ width, setWidth ] = useState(border.width)
    
    const types = [
        { label: __( escapeHTML( "None" ), "digital-newspaper" ), value: 'none' },
        { label: __( escapeHTML( "Dotted" ), "digital-newspaper" ), value: 'dotted' },
        { label: __( escapeHTML( "Dashed" ), "digital-newspaper" ), value: 'dashed' },
        { label: __( escapeHTML( "Solid" ), "digital-newspaper" ), value: 'solid' }
    ]

    useEffect(() => {
        let newBorder = {
            type: type,
            color: color,
            width: width
        }
        setBorder(newBorder)
        customize.value( props.setting )(newBorder)
    },[type,color,width] );

    function getBackground(color) {
        if( color == null ) return
        if( color.includes('preset') ) {
            return 'var(' + color + ')'
        } else {
            return color
        }
    }

    return (
        <>
            <div className="block-header">
                <span className="customize-control-title">{ customize.settings.controls[props.setting].label }</span>
            </div>
            <div className="control-inner">
                <SelectControl
                    value={ type }
                    options={ types }
                    onChange={ ( newType ) => setType( newType ) }
                />
                { ( type != 'none' ) &&
                    <Dropdown
                        popoverProps={{resize:false,noArrow:false,flip:true,placement:'bottom-end'}}
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <ColorIndicator 
                                className={ color == null && "null-color" }
                                data-tip={ __( escapeHTML( 'initial' ), 'digital-newspaper' ) }
                                colorValue = { getBackground(color) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ () => <>
                            <div className="preset-colors">
                                <ul className="preset-colors-inner">
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-1' ) && 'active' } data-tip={ __( escapeHTML( 'color 1' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-1)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-1')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-2' ) && 'active' } data-tip={ __( escapeHTML( 'color 2' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-2)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-2')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-3' ) && 'active' } data-tip={ __( escapeHTML( 'color 3' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-3)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-3')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-4' ) && 'active' } data-tip={ __( escapeHTML( 'color 4' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-4)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-4')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-5' ) && 'active' } data-tip={ __( escapeHTML( 'color 5' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-5)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-5')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-6' ) && 'active' } data-tip={ __( escapeHTML( 'color 6' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-6)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-6')}/>
                                </ul>
                            </div>
                            <ColorPicker
                                color={color}
                                onChange={ ( newColor ) => setColor( newColor ) }
                                enableAlpha
                            />
                            <Tooltip effect="solid"/>
                        </> }
                    />
                }
            </div>
        </>
    )
}