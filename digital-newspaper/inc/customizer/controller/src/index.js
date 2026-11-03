const { TabPanel, ColorPicker, GradientPicker, Card, CardBody, ToggleControl, ColorIndicator, ButtonGroup, Button, ResponsiveWrapper, RangeControl, CheckboxControl, Dropdown, SelectControl, Dashicon, TextControl } = wp.components;
const { render, useState, useEffect } = wp.element;
const { MediaUpload } = wp.blockEditor;
const { __ } = wp.i18n;
const { escapeHTML } = wp.escapeHtml;
const { customize } = wp;
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { DigitalNewspaperBlockRepeater } from './repeaterComponent'
import { DigitalNewspaperBorder } from './borderComponent'
import { DigitalNewspaperItemSort } from './sortComponent'
import { DigitalNewspaperTypography } from './typographyComponent'
import { DigitalNewspaperBoxShadow } from './boxShadowComponent'
import { DigitalNewspaperPostsMultiselect } from './asyncPostsMultiSelect'
import { DigitalNewspaperCategoriesMultiselect } from './asyncCategoriesMultiSelect'
import { Tooltip } from 'react-tooltip'
import Select from 'react-select'

const DigitalNewspaperUpsellWithPreview = ( props ) => {
    const [ choices, setChoices ] = useState(customize.settings.controls[props.setting].choices) 
    return (
            <>
                { choices &&
                    choices.map(function(choice, key) {
                        return (
                            <div className={`upsell-inner-wrap ${(choice.classes) ? choice.classes : '' }`}>
                                <div class="button-icon">
                                    { choice.icon &&
                                        <i class={`up-icon ${choice.icon}`}></i>
                                    }
                                    <Button className="upsell-button" href={ choice.url } target="__blank" variant="primary" text={ choice.label } isSmall={true}/>
                                </div>
                                { choice.preview_url &&
                                    <img class="upsell-preview-frame" src={choice.preview_url}/>
                                }
                            </div>
                        )
                    })
                }
            </>
    )
}

const DigitalNewspaperInfoBox = ( props ) => {
    const [ choices, setChoices ] = useState(customize.settings.controls[props.setting].choices) 
    return (
        <Card>
            <CardBody>
                <h2 className="info-box-label"><Dashicon className="info-box-icon" icon="info"/>{ customize.settings.controls[props.setting].label }</h2>
                { customize.settings.controls[props.setting].description &&
                    <p className="info-box-description">{ customize.settings.controls[props.setting].description }</p>
                }
                { choices &&
                    choices.map(function(choice, key) {
                        return (
                            <Button className="info-box-button" href={ choice.url } target="__blank" variant="primary" text={ choice.label } isSmall={true}/>
                        )
                    })
                }
            </CardBody>
        </Card>
    )
}

const DigitalNewspaperInfoBoxAction = ( props ) => {
    const [ choices, setChoices ] = useState(customize.settings.controls[props.setting].choices) 
    return (
        <Card>
            <CardBody>
                <h2 className="info-box-label"><Dashicon className="info-box-icon" icon="info"/>{ customize.settings.controls[props.setting].label }</h2>
                { customize.settings.controls[props.setting].description &&
                    <p className="info-box-description">{ customize.settings.controls[props.setting].description }</p>
                }
                { choices &&
                    choices.map(function(choice, key) {
                        return (
                            <Button className="info-box-button" data-action={ choice.action } variant="primary" text={ choice.label } isSmall={true}/>
                        )
                    })
                }
            </CardBody>
        </Card>
    )
}

// Responsive multiselect tab control
const DigitalNewspaperResponsiveMultiselectTab = ( props ) => {
    const [ tab, setTab ] = useState(props.value)
    const [ desktop, setDesktop ] = useState(tab.desktop)
    const [ tablet, setTablet ] = useState(tab.tablet)
    const [ mobile, setMobile ] = useState(tab.mobile)
    
    useEffect(() => {
        let newTab = {
            desktop: desktop,
            tablet: tablet,
            mobile: mobile
        }
        setTab(newTab)
        customize.value( props.setting )(newTab)
    }, [desktop,tablet,mobile])

    return(
        <>
            <div className="block-header">
                <span class="customize-control-title">{ customize.settings.controls[props.setting].label }</span>
            </div>
            <ButtonGroup className="control-inner">
                <Button data-tip={ __( escapeHTML( 'show on desktop' ), 'digital-newspaper' ) } variant={ desktop ? 'primary' : 'secondary' } onClick={() => setDesktop(!desktop) }><span class="dashicons dashicons-desktop"></span></Button>
                <Button data-tip={ __( escapeHTML( 'show on tablet' ), 'digital-newspaper' ) } variant={ tablet ? 'primary' : 'secondary' } onClick={() => setTablet(!tablet) }><span class="dashicons dashicons-tablet"></span></Button>
                <Button data-tip={ __( escapeHTML( 'show on mobile' ), 'digital-newspaper' ) } variant={ mobile ? 'primary' : 'secondary' } onClick={() => setMobile(!mobile) }><span class="dashicons dashicons-smartphone"></span></Button>
            </ButtonGroup>
            <Tooltip effect="solid"/>
        </>
    )
}

// Radio Tab control
const DigitalNewspaperRadioTab = ( props ) => {
    const [ tab, setTab ] = useState(props.value)
    const { choices } = customize.settings.controls[props.setting]
    
    useEffect(() => {
        customize.value( props.setting )(tab)
    }, [tab])

    return(
        <>
            <div className="block-header">
                <span class="customize-control-title">{ customize.settings.controls[props.setting].label }</span>
            </div>
            <ButtonGroup className="control-inner">
                { choices &&
                    choices.map( (choice) => {
                        return(
                            <Button variant={ tab == choice.value ? 'primary' : 'secondary' } onClick={() => setTab(choice.value) }>{choice.label}</Button>
                        )
                    })
                }
            </ButtonGroup>
        </>
    )
}

// Radio Bubble control
const DigitalNewspaperRadioBubble = ( props ) => {
    const [ bubble, setBubble ] = useState(props.value)
    const { choices } = customize.settings.controls[props.setting]
    
    useEffect(() => {
        customize.value( props.setting )(bubble)
    }, [bubble])

    return(
        <>
            { customize.settings.controls[props.setting].label && 
                <div className="block-header">
                    <span class="customize-control-title">{ customize.settings.controls[props.setting].label }</span>
                </div>
            }
            <div className={ choices.length > 2 ? `radio-bubbles column-4` : `radio-bubbles column-2`}>
                { choices &&
                    choices.map( (choice) => {
                        return(
                            <span className={ bubble == choice.value ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setBubble(choice.value) }>{choice.label}</span>
                        )
                    })
                }
            </div>
        </>
    )
}

// Preset Gradient color picker
const DigitalNewspaperPresetGradientPicker = ( props ) =>  {
    const [ preset, setPreset ] = useState(props.value)
    const { variable } = customize.settings.controls[props.setting]
    
    const updateControl = ( currentPreset ) => {
        setPreset( currentPreset )
        customize.value( props.setting )(currentPreset)
    }

    useEffect(() => {
        const html = document.getElementsByTagName( "html" )
        let style = html[0].getAttribute("style")
        if( style != null ) {
            style += variable + ":" + preset + ";"
        } else {
            style = variable + ":" + preset + ";"
        }
        html[0].setAttribute( "style", style )
        customize.value( props.setting )(preset)
    }, [preset])

    return (
        <div className="control-header">
            <div className="control-header-trigger">
                <label>{ customize.settings.controls[props.setting].label }</label>
                <span>
                    <Dropdown
                        popoverProps={{resize:false,noArrow:false,flip:true,placement:'bottom-end'}}
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <ColorIndicator 
                                className={ ( preset == null || preset == '' ) && "null-color" }
                                data-tip={ __( escapeHTML( 'Gradient' ), 'digital-newspaper' ) }
                                colorValue = { preset }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ () => <Card>
                            <GradientPicker
                                value={ preset }
                                onChange={ ( currentPreset ) => updateControl( currentPreset ) }
                                __nextHasNoMargin={true}
                                gradients={[]}
                            />
                        </Card> }
                    />
                    <Tooltip effect="solid"/>
                </span>
            </div>
        </div>
    )
}

// Color Group control
const DigitalNewspaperColorGroup = ( props ) =>  {
    const [ colorGroup, setColorGroup ] = useState(props.value )
    const [ color, setColor ] = useState(props.value.solid )
    const [ gradient, setGradient ] = useState(props.value.gradient)
    const [ type, setType ] = useState(props.value.type)

    useEffect(() => {
        setColorGroup({ type: type, solid: color, gradient: gradient })
        customize.value( props.setting )(JSON.stringify({ type: type, solid: color, gradient: gradient }))
    },[color,gradient] );

    const resetData = () => {
        setType(props.value.type)
        setColor(props.value.solid)
        setGradient(props.value.gradient)
    }

    function getBackground(color) {
        if( color == null ) return
        if( color.includes('preset') ) {
            return 'var(' + color + ')'
        } else {
            return color
        }
    }

    return (
        <div className="control-header">
            <div className="control-header-trigger">
                <label>{ customize.settings.controls[props.setting].label }</label>
                <span className="control-content-wrap">
                    <span class="reset-button components-button is-secondary is-small" onClick={() => resetData() }><span class="dashicon dashicons dashicons-image-rotate"></span></span>
                    <Dropdown
                        popoverProps={{resize:false,noArrow:false,flip:true,placement:'bottom-end'}}
                        style={{
                            backgroundColor: "#00000"
                        }}
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <ColorIndicator 
                                className={ colorGroup[type] == null && "null-color" }
                                data-tip={type}
                                colorValue = { getBackground(colorGroup[type]) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ () => 
                            <TabPanel
                                className="digital-newspaper-group-tab-panel"
                                activeClass="active-tab"
                                initialTabName = {type}
                                onSelect = { (tabName) => setType( tabName )
                                }
                                tabs={ [
                                    {
                                        name: 'solid',
                                        title: 'Solid',
                                        className: 'tab-solid',
                                    },
                                    {
                                        name: 'gradient',
                                        title: 'Gradient',
                                        className: 'tab-gradient',
                                    },
                                ] }
                            >
                                { ( tab ) => {
                                    if( tab.name == "solid" ) {
                                        return <>
                                            <div className="preset-colors">
                                                <ul className="preset-colors-inner">
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-1' ) && 'active' } data-tip={ __( escapeHTML( 'color 1' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-1)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-1')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-2' ) && 'active' } data-tip={ __( escapeHTML( 'color 2' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-2)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-2')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-3' ) && 'active' } data-tip={ __( escapeHTML( 'color 3' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-3)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-3')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-4' ) && 'active' } data-tip={ __( escapeHTML( 'color 4' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-4)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-4')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-5' ) && 'active' } data-tip={ __( escapeHTML( 'color 5' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-5)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-5')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-6' ) && 'active' } data-tip={ __( escapeHTML( 'color 6' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-6)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-6')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-7' ) && 'active' } data-tip={ __( escapeHTML( 'color 7' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-7)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-7')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-8' ) && 'active' } data-tip={ __( escapeHTML( 'color 8' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-8)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-8')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-9' ) && 'active' } data-tip={ __( escapeHTML( 'color 9' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-9)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-9')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-10' ) && 'active' } data-tip={ __( escapeHTML( 'color 10' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-10)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-10')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-11' ) && 'active' } data-tip={ __( escapeHTML( 'color 11' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-11)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-11')}/>
                                                    <li className={ ( color == '--digital-newspaper-global-preset-color-12' ) && 'active' } data-tip={ __( escapeHTML( 'color 12' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-12)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-12')}/>
                                                </ul>
                                            </div>
                                            <ColorPicker
                                                color={color}
                                                onChange={setColor}
                                                enableAlpha
                                            />
                                            <button type="button" class="components-button is-secondary is-small" onClick={ () => setColor(null) }>{ __( 'Clear', 'digital-newspaper' ) }</button>
                                            <Tooltip effect="solid"/>
                                            </>
                                    } else if( tab.name == "gradient" ) {
                                        return <>
                                                <div className="preset-colors">
                                                    <ul className="preset-colors-inner">
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-1' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 1' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-1)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-1')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-2' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 2' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-2)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-2')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-3' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 3' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-3)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-3')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-4' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 4' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-4)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-4')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-5' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 5' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-5)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-5')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-6' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 6' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-6)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-6')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-7' ) && 'active' } data-tip={ __( escapeHTML( 'color 7' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-7)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-7')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-8' ) && 'active' } data-tip={ __( escapeHTML( 'color 8' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-8)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-8')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-9' ) && 'active' } data-tip={ __( escapeHTML( 'color 9' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-9)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-9')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-10' ) && 'active' } data-tip={ __( escapeHTML( 'color 10' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-10)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-10')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-11' ) && 'active' } data-tip={ __( escapeHTML( 'color 11' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-11)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-11')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-12' ) && 'active' } data-tip={ __( escapeHTML( 'color 12' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-12)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-12')}/>
                                                    </ul>
                                                </div>
                                                <GradientPicker
                                                    value={ gradient }
                                                    onChange={ ( currentGradient ) => setGradient( currentGradient ) }
                                                    __nextHasNoMargin={true}
                                                    gradients={[]}
                                                />
                                                <Tooltip effect="solid"/>
                                            </>
                                    }
                                } }
                            </TabPanel> }
                    />
                </span>
            </div>
        </div>
    )
}

// Toggle Button control
const DigitalNewspaperToggleButton = ( props ) =>  {
    const [ toggle, setToggle ] = useState(props.value)

    const updateControl = ( newToggle ) => {
        setToggle( newToggle )
        customize.value( props.setting )(newToggle)
    }
    return (
        <Card elevation={2} isRounded={false} isBorderless={true} size="small">
            <CardBody>
                <ToggleControl
                    label={ customize.settings.controls[props.setting].label }
                    help={
                        toggle
                            ? 'Currently enabled.'
                            : 'Currently disabled.'
                    }
                    checked={ toggle }
                    onChange={ (newToggle) => updateControl( newToggle ) }
                />
                { customize.settings.controls[props.setting].description && <span className="description customize-control-description">{ customize.settings.controls[props.setting].description }</span> }
            </CardBody>
        </Card>
    )
}

// Simple Toggle Button control
const DigitalNewspaperSimpleToggleButton = ( props ) =>  {
    const [ toggle, setToggle ] = useState(props.value)

    const updateControl = ( newToggle ) => {
        setToggle( newToggle )
        customize.value( props.setting )(newToggle)
    }
    return (
        <ToggleControl
            label={ customize.settings.controls[props.setting].label }
            checked={ toggle }
            onChange={ (newToggle) => updateControl( newToggle ) }
        />
    )
}

// Preset Color Picker control
const DigitalNewspaperPresetColorPicker = ( props ) =>  {
    const [ preset, setPreset ] = useState(props.value)
    const { variable } = customize.settings.controls[props.setting]

    useEffect(() => {
        const html = document.getElementsByTagName( "html" )
        let style = html[0].getAttribute("style")
        if( style != null ) {
            style += variable + ":" + preset + ";"
        } else {
            style = variable + ":" + preset + ";"
        }
        html[0].setAttribute( "style", style )
        customize.value( props.setting )(preset)
    }, [preset])

    return (
        <div className="control-header">
            <div className="control-header-trigger">
                <label>{ customize.settings.controls[props.setting].label }</label>
                <span className="control-content-wrap">
                    <Dropdown
                        popoverProps={{resize:false,noArrow:false,flip:true,placement:'bottom-end'}}
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <ColorIndicator 
                                data-tip={ __( escapeHTML( 'preset' ), 'digital-newspaper' ) }
                                colorValue = { preset }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ () => <>
                            <ColorPicker
                                color={preset}
                                onChange={ ( newPreset ) => setPreset( newPreset ) }
                                enableAlpha
                            />
                            <Tooltip effect="solid"/>
                        </> }
                    />
                    <Tooltip effect="solid"/>
                </span>
            </div>
        </div>
    )
}

// Color Picker control
const DigitalNewspaperColorPicker = ( props ) =>  {
    const [ color, setColor ] = useState(props.value)

    useEffect(() => {
        customize.value( props.setting )(color)
    }, [color])

    const updateControl = ( newColor ) => {
        setColor( newColor )
    }

    const resetData = () => {
        setColor(props.value)
    }

    function getBackground(color) {
        if( color == null ) return
        if( color.includes('preset') ) {
            return 'var(' + color + ')'
        } else {
            return color
        }
    }

    return (
        <div className="control-header">
            <div className="control-header-trigger">
                <label>{ customize.settings.controls[props.setting].label }</label>
                <span className="control-content-wrap">
                    <span class="reset-button components-button is-secondary is-small" onClick={() => resetData() }><span class="dashicon dashicons dashicons-image-rotate"></span></span>
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
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-7' ) && 'active' } data-tip={ __( escapeHTML( 'color 7' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-7)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-7')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-8' ) && 'active' } data-tip={ __( escapeHTML( 'color 8' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-8)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-8')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-9' ) && 'active' } data-tip={ __( escapeHTML( 'color 9' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-9)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-9')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-10' ) && 'active' } data-tip={ __( escapeHTML( 'color 10' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-10)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-10')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-11' ) && 'active' } data-tip={ __( escapeHTML( 'color 11' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-11)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-11')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-12' ) && 'active' } data-tip={ __( escapeHTML( 'color 12' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-12)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-12')}/>
                                </ul>
                            </div>
                            <ColorPicker
                                color={color}
                                onChange={ ( newColor ) => updateControl( newColor ) }
                                enableAlpha
                            />
                            <Tooltip effect="solid"/>
                        </> }
                    />
                    <Tooltip effect="solid"/>
                </span>
            </div>
        </div>
    )
}

// Color and image field Group control
const DigitalNewspaperColorImageGroup = ( props ) =>  {
    const [ controlValue,setControlValue ] = useState(props.value)
    const [ styles, setStyles ] = useState()
    const [ color, setColor ] = useState(props.value.solid)
    const [ gradient, setGradient ] = useState(props.value.gradient)
    const [ image, setImage ] = useState(props.value.image )
    const [ position, setPosition ] = useState(props.value.position )
    const [ attachment, setAttachment ] = useState(props.value.attachment )
    const [ repeat, setRepeat ] = useState(props.value.repeat )
    const [ size, setSize ] = useState(props.value.size )
    const [ type, setType ] = useState(props.value.type )
    const [ imageSettings, setImageSettings ] = useState(false)

    useEffect(() => {
        setControlValue({ type: type, solid: color, gradient: gradient, image: image })
    },[color,gradient,image] );

    useEffect(() => {
        const newStyles = type == 'image' ? "#fff": getBackground( controlValue[type] )
        setStyles(newStyles)
    },[controlValue])

    useEffect(() => {
        customize.value( props.setting )(JSON.stringify({ type: type, solid: color, gradient: gradient, image: image, position: position, attachment: attachment, repeat: repeat, size: size }))
    },[color,gradient,image,position,attachment,repeat,size] );

    const removeMedia = () => {
		setImage({
			media_id: 0,
			media_url: ''
		});
	}

    function getBackground(newPreFormatColor) {
        if( newPreFormatColor == null ) return
        if( newPreFormatColor.includes('preset') ) {
            return 'var(' + newPreFormatColor + ')'
        } else {
            return newPreFormatColor
        }
    }

 	const onSelectMedia = (media) => {
		setImage({
			media_id: media.id,
			media_url: media.url
		});
	}

    const resetData = () => {
        setType(props.value.type)
        setColor(props.value.solid)
        setGradient(props.value.gradient)
        setImage(props.value.image)
    }

    return (
        <div className="control-header">
            <div className="control-header-trigger">
                <label>{ customize.settings.controls[props.setting].label }</label>
                <span className="control-content-wrap">
                    <span class="reset-button components-button is-secondary is-small" onClick={() => resetData() }><span class="dashicon dashicons dashicons-image-rotate"></span></span>
                    <Dropdown
                        popoverProps={{resize:false,noArrow:false,flip:true,placement:'bottom-end'}}
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <ColorIndicator 
                                className={ controlValue[type] == null ? "null-color" : type == "image" ? "dashicons dashicons-format-image" : type }
                                data-tip={ type }
                                style = {{ background: styles }}
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ () => 
                            <TabPanel
                                className="digital-newspaper-group-tab-panel"
                                activeClass="active-tab"
                                initialTabName = {type}
                                onSelect = { (tabName) => setType( tabName )
                                }
                                tabs={ [
                                    {
                                        name: 'solid',
                                        title: __( 'Solid', 'digital-newspaper' ),
                                        className: 'tab-solid',
                                    },
                                    {
                                        name: 'gradient',
                                        title: __( 'Gradient', 'digital-newspaper' ),
                                        className: 'tab-gradient',
                                    },
                                    {
                                        name: 'image',
                                        title: __( 'Image', 'digital-newspaper' ),
                                        className: 'tab-image',
                                    },
                                ] }
                            >
                                { ( tab ) => {
                                    if( tab.name == "solid" ) {
                                        return <>
                                                <div className="preset-colors">
                                                    <ul className="preset-colors-inner">
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-1' ) && 'active' } data-tip={ __( escapeHTML( 'color 1' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-1)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-1')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-2' ) && 'active' } data-tip={ __( escapeHTML( 'color 2' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-2)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-2')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-3' ) && 'active' } data-tip={ __( escapeHTML( 'color 3' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-3)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-3')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-4' ) && 'active' } data-tip={ __( escapeHTML( 'color 4' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-4)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-4')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-5' ) && 'active' } data-tip={ __( escapeHTML( 'color 5' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-5)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-5')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-6' ) && 'active' } data-tip={ __( escapeHTML( 'color 6' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-6)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-6')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-7' ) && 'active' } data-tip={ __( escapeHTML( 'color 7' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-7)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-7')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-8' ) && 'active' } data-tip={ __( escapeHTML( 'color 8' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-8)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-8')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-9' ) && 'active' } data-tip={ __( escapeHTML( 'color 9' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-9)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-9')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-10' ) && 'active' } data-tip={ __( escapeHTML( 'color 10' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-10)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-10')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-11' ) && 'active' } data-tip={ __( escapeHTML( 'color 11' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-11)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-11')}/>
                                                        <li className={ ( color == '--digital-newspaper-global-preset-color-12' ) && 'active' } data-tip={ __( escapeHTML( 'color 12' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-12)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-12')}/>
                                                    </ul>
                                                </div>
                                                <ColorPicker
                                                    color={color}
                                                    onChange={setColor}
                                                    enableAlpha
                                                />
                                                <button type="button" className="components-button is-secondary is-small" onClick={()=>setColor(null)}>{ __('Clear', 'digital-newspaper') }</button>
                                                <Tooltip effect="solid"/>
                                            </>
                                    } else if( tab.name == "gradient" ) {
                                        return <>
                                                <div className="preset-colors">
                                                    <ul className="preset-colors-inner">
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-1' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 1' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-1)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-1')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-2' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 2' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-2)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-2')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-3' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 3' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-3)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-3')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-4' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 4' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-4)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-4')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-5' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 5' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-5)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-5')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-6' ) && 'active' } data-tip={ __( escapeHTML( 'gradient 6' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-6)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-6')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-7' ) && 'active' } data-tip={ __( escapeHTML( 'color 7' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-7)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-7')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-8' ) && 'active' } data-tip={ __( escapeHTML( 'color 8' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-8)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-8')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-9' ) && 'active' } data-tip={ __( escapeHTML( 'color 9' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-9)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-9')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-10' ) && 'active' } data-tip={ __( escapeHTML( 'color 10' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-10)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-10')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-11' ) && 'active' } data-tip={ __( escapeHTML( 'color 11' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-11)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-11')}/>
                                                        <li className={ ( gradient == '--digital-newspaper-global-preset-gradient-color-12' ) && 'active' } data-tip={ __( escapeHTML( 'color 12' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-gradient-color-12)' }} onClick={()=> setGradient('--digital-newspaper-global-preset-gradient-color-12')}/>
                                                    </ul>
                                                </div>
                                                <GradientPicker
                                                    value={ gradient }
                                                    onChange={ ( currentGradient ) => setGradient( currentGradient ) }
                                                    __nextHasNoMargin={true}
                                                    gradients={[]}
                                                />
                                                <Tooltip effect="solid"/>
                                            </>
                                    } else if( tab.name == "image" ) {
                                        return (
                                            <><div className="editor-post-featured-image">
                                                <MediaUpload
                                                    onSelect={onSelectMedia}
                                                    value={image.media_id}
                                                    allowedTypes={ ['image'] }
                                                    render={({open}) => (
                                                        <Button 
                                                            className={image.media_id == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                                                            onClick={open}
                                                        >
                                                            {image.media_id == 0 && __('Choose an image', 'digital-newspaper')}
                                                            {( image != undefined && image.media_id != 0 && image.media_url != '' ) &&
                                                                <ResponsiveWrapper
                                                                    naturalWidth={ 200 }
                                                                    naturalHeight={ 200 }
                                                                >
                                                                    <img src={image.media_url} />
                                                                </ResponsiveWrapper>
                                                                }
                                                        </Button>
                                                    )}
                                                />
                                                {image.media_id != 0 && 
                                                    <MediaUpload
                                                        title={__('Replace image', 'digital-newspaper')}
                                                        value={image.media_id}
                                                        onSelect={onSelectMedia}
                                                        allowedTypes={['image']}
                                                        render={({open}) => (
                                                            <Button onClick={open} variant="secondary" isLarge>{__('Replace image', 'digital-newspaper')}</Button>
                                                        )}
                                                    />
                                                }
                                                {image.media_id != 0 && 
                                                    <Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'digital-newspaper')}</Button>
                                                }
                                            </div>
                                            <div className="more-settings">
                                                <Button variant="tertiary" isSmall={true} iconPosition="right" icon={ imageSettings ? 'arrow-up-alt' : 'arrow-down-alt'} onClick={() => setImageSettings(!imageSettings)}>{ imageSettings ? __( 'Show less settings!', 'digital-newspaper') : __( 'Show more settings!', 'digital-newspaper') }</Button>
                                                { ( imageSettings && image.media_id != 0  ) &&
                                                    <>
                                                        <SelectControl
                                                            label= { __( 'Background Position', 'digital-newspaper') }
                                                            value={ position }
                                                            options={ [
                                                                { label: 'Left Top', value: 'left top' },
                                                                { label: 'Left Center', value: 'left center' },
                                                                { label: 'Left Bottom', value: 'left bottom' },
                                                                { label: 'Right Top', value: 'right top' },
                                                                { label: 'Right Center', value: 'right center' },
                                                                { label: 'Right Bottom', value: 'right bottom' },
                                                                { label: 'Center Top', value: 'center top' },
                                                                { label: 'Center Center', value: 'center center' },
                                                                { label: 'Center Bottom', value: 'center bottom' },
                                                            ] }
                                                            onChange={ ( newPosition ) => setPosition( newPosition ) }
                                                        />
                                                        <SelectControl
                                                            label= { __( 'Background Repeat', 'digital-newspaper') }
                                                            value={ repeat }
                                                            options={ [
                                                                { label: 'No Repeat', value: 'no-repeat' },
                                                                { label: 'Repeat All', value: 'repeat' },
                                                                { label: 'Repeat Horizontally', value: 'repeat-x' },
                                                                { label: 'Repeat Vertically', value: 'repeat-y' }
                                                            ] }
                                                            onChange={ ( newRepeat ) => setRepeat( newRepeat ) }
                                                        />
                                                        <div>
                                                            <div className="components-truncate components-text components-input-control__label">{ __( 'Background Attachment', 'digital-newspaper') }</div>
                                                            <ButtonGroup>
                                                                <Button variant={ attachment == 'fixed' ? 'primary' : 'secondary' } onClick={() => setAttachment('fixed')}>{ __( 'Fixed', 'digital-newspaper') }</Button>
                                                                <Button variant={ attachment == 'scroll' ? 'primary' : 'secondary' } onClick={() => setAttachment('scroll')}>{ __( 'Scroll', 'digital-newspaper') }</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                        <div>
                                                            <div className="components-truncate components-text components-input-control__label">{ __( 'Background Size', 'digital-newspaper') }</div>
                                                            <ButtonGroup>
                                                                <Button variant={ size == 'auto' ? 'primary' : 'secondary' } onClick={() => setSize('auto')}>{ __( 'Auto', 'digital-newspaper') }</Button>
                                                                <Button variant={ size == 'cover' ? 'primary' : 'secondary' } onClick={() => setSize('cover')}>{ __( 'Cover', 'digital-newspaper') }</Button>
                                                                <Button variant={ size == 'contain' ? 'primary' : 'secondary' } onClick={() => setSize('contain')}>{ __( 'Contain', 'digital-newspaper') }</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                            </>
                                        )
                                    }
                                } }
                            </TabPanel>
                        }
                    />
                </span>
            </div>
            <Tooltip effect="solid"/>
        </div>
    )
}

// Range control
const DigitalNewspaperRange = ( props ) =>  {
    const [ range, setRange ] = useState(props.value)
    const [ initialValue ] = useState(props.value)

    const updateControl = ( newRange ) => {
        setRange( newRange )
        customize.value( props.setting )(newRange)
    }
    return (
        <RangeControl
            label={ customize.settings.controls[props.setting].label }
            description={ customize.settings.controls[props.setting].description }
            value={ range }
            allowReset = {customize.settings.controls[props.setting].input_attrs.reset}
            onChange={ ( newRange ) => updateControl( newRange ) }
            min={ customize.settings.controls[props.setting].input_attrs.min }
            max={ customize.settings.controls[props.setting].input_attrs.max }
            step={ customize.settings.controls[props.setting].input_attrs.step }
            resetFallbackValue={initialValue}
        />
    )
}

// Responsive Control
const DigitalNewspaperResponsiveBox = ( props ) =>  {
    const [ icon, setIcon ] = useState('desktop')
    const [ value, setValue ] = useState(props.value)

    const updateControl = ( newBox ) => {
        let newValue = value
        newValue[icon] = newBox
        setValue(JSON.parse(JSON.stringify(newValue)))
        customize.value( props.setting )(JSON.parse(JSON.stringify(newValue)))
    }
    
    const updateIcon = (newIcon) => {
        const footer = document.getElementById( "customize-footer-actions" )
        if( newIcon == 'tablet' ) { 
            setIcon( 'tablet' )
            footer.getElementsByClassName( "preview-tablet" )[0].click()
        }
        if( newIcon == 'smartphone' ) {
            setIcon( 'smartphone' )
            footer.getElementsByClassName( "preview-mobile" )[0].click()
        }
        if( newIcon == 'desktop' ) {
            setIcon( 'desktop' )
            footer.getElementsByClassName( "preview-desktop" )[0].click()
        }
    }

    const triggerDevice = (device) => {
        if( device == 'mobile' ) {
            setIcon( 'smartphone' )
        } else {
            setIcon( device )
        }
    }

    useEffect(() => {
        const resFooter = document.getElementById( "customize-footer-actions" )
        const resFooterClass =  resFooter.getElementsByClassName( "devices-wrapper" )
        const buttons = resFooterClass[0].getElementsByTagName( "button" )
        for(  const button of buttons ) {
            button.addEventListener( "click", function() {
                const currentDevice =  button.getAttribute("data-device")
                triggerDevice(currentDevice)
            })
        }
    },[])

    return (
        <>
            <div className="responsive-icons">
                <Dashicon className={ `responsive-trigger ${ ( icon == 'desktop' ) && "isActive" }` } data-tip={ __( escapeHTML( 'Desktop' ), 'digital-newspaper' ) } icon="desktop" onClick={() => updateIcon("desktop") } />
                <Dashicon className={ `responsive-trigger ${ ( icon == 'tablet' ) && "isActive" }` } data-tip={ __( escapeHTML( 'Tablet' ), 'digital-newspaper' ) } icon="tablet" onClick={() => updateIcon("tablet") } />
                <Dashicon className={ `responsive-trigger ${ ( icon == 'smartphone' ) && "isActive" }` } data-tip={ __( escapeHTML( 'Mobile' ), 'digital-newspaper' ) } icon="smartphone" onClick={() => updateIcon("smartphone") } />
            </div>
            <BoxControl
                label={customize.settings.controls[props.setting].label}
                allowReset={false}
                values={ value[icon] }
                onChange={ ( newBox ) => updateControl( newBox ) }
            />
        </>
    )
}

// Responsive Range Control
const DigitalNewspaperRangeResponsive = ( props ) =>  {
    const [ icon, setIcon ] = useState('desktop')
    const [ range, setRange ] = useState(props.value)
    const [ initialRange ] = useState(props.value)
    
    const updateControl = ( newBox ) => {
        range[icon] = newBox
        setRange(JSON.parse(JSON.stringify(range)))
        customize.value( props.setting )(range)
    }
    
    const updateIcon = (newIcon) => {
        const footer = document.getElementById( "customize-footer-actions" )
        if( newIcon == 'tablet' ) { 
            setIcon( 'tablet' )
            footer.getElementsByClassName( "preview-tablet" )[0].click()
        }
        if( newIcon == 'smartphone' ) {
            setIcon( 'smartphone' )
            footer.getElementsByClassName( "preview-mobile" )[0].click()
        }
        if( newIcon == 'desktop' ) {
            setIcon( 'desktop' )
            footer.getElementsByClassName( "preview-desktop" )[0].click()
        }
    }

    const triggerDevice = (device) => {
        if( device == 'mobile' ) {
            setIcon( 'smartphone' )
        } else {
            setIcon( device )
        }
    }

    useEffect(() => {
        const resFooter = document.getElementById( "customize-footer-actions" )
        const resFooterClass =  resFooter.getElementsByClassName( "devices-wrapper" )
        const buttons = resFooterClass[0].getElementsByTagName( "button" )
        for(  const button of buttons ) {
            button.addEventListener( "click", function() {
                const currentDevice =  button.getAttribute("data-device")
                triggerDevice(currentDevice)
            })
        }
    },[])

    return (
        <>
            <div className="responsive-icons">
                <Dashicon className={ `responsive-trigger ${ ( icon == 'desktop' ) && "isActive" }` } data-tip={ __( escapeHTML( 'Desktop' ), 'digital-newspaper' ) } icon="desktop" onClick={() => updateIcon("desktop") } />
                <Dashicon className={ `responsive-trigger ${ ( icon == 'tablet' ) && "isActive" }` } data-tip={ __( escapeHTML( 'Tablet' ), 'digital-newspaper' ) } icon="tablet" onClick={() => updateIcon("tablet") } />
                <Dashicon className={ `responsive-trigger ${ ( icon == 'smartphone' ) && "isActive" }` } data-tip={ __( escapeHTML( 'Mobile' ), 'digital-newspaper' ) } icon="smartphone" onClick={() => updateIcon("smartphone") } />
            </div>
            <RangeControl
                label={ customize.settings.controls[props.setting].label }
                description={ customize.settings.controls[props.setting].description }
                value={ range[icon] }
                allowReset = {customize.settings.controls[props.setting].input_attrs.reset}
                onChange={ ( newRange ) => updateControl( newRange ) }
                min={ customize.settings.controls[props.setting].input_attrs.min }
                max={ customize.settings.controls[props.setting].input_attrs.max }
                step={ customize.settings.controls[props.setting].input_attrs.step }
                resetFallbackValue={initialRange[icon]}
            />
        </>
    )
}

// Multiselect category control
const DigitalNewspaperMultiselect = ( props ) => {
    const [ multiselect, setMultiselect ] = useState(JSON.parse(props.value))
    const { choices } = customize.settings.controls[props.setting]
    
    useEffect(() => {
        customize.value( props.setting )(JSON.stringify(multiselect))
    }, [multiselect]);

    return (
        <>
            { choices && 
                <Select
                    isMulti={true}
                    inputId="digital-newspaper-search-in-select"
                    isSearchable ={true}
                    heading={customize.settings.controls[props.setting].label}
                    placeholder={__( escapeHTML( 'Type to search . . ' ), 'digital-newspaper' )}
                    value={multiselect}
                    options={choices}
                    onChange={ ( newMultiselect ) => setMultiselect( newMultiselect ) }
                />
            }
        </>
    )
}

// Checkbox control
const DigitalNewspaperCheckbox = ( props ) =>  {
    const [ checkbox, setCheckbox ] = useState(props.value)

    const updateControl = ( newCheckbox ) => {
        setCheckbox( newCheckbox )
        customize.value( props.setting )(newCheckbox)
    }
    return (
        <CheckboxControl
            label= { customize.settings.controls[props.setting].label }
            help={ customize.settings.controls[props.setting].description }
            checked={ checkbox }
            onChange={ (newCheckbox) => updateControl(newCheckbox) }
        />
    )
}

// Color Group control
const DigitalNewspaperColorGroupPicker = ( props ) =>  {
    const [ color, setColor ] = useState(props.value.color)
    const [ hover, setHover ] = useState(props.value.hover)
    
    useEffect(() => {
        customize.value( props.setting )({ color: color, hover: hover })
    },[color,hover] );

    const resetData = () => {
        setColor(props.value.color)
        setHover(props.value.hover)
    }

    function getBackground(color) {
        if( color == null ) return
        if( color.includes('preset') ) {
            return 'var(' + color + ')'
        } else {
            return color
        }
    }
    
    return (
        <div className="control-header">
            <div className="control-header-trigger color-group-inner-wrap">
                <label>{ customize.settings.controls[props.setting].label }</label>
                <span className="control-content-wrap">
                    <span class="reset-button components-button is-secondary is-small" onClick={() => resetData() }><span class="dashicon dashicons dashicons-image-rotate"></span></span>
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
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-7' ) && 'active' } data-tip={ __( escapeHTML( 'color 7' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-7)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-7')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-8' ) && 'active' } data-tip={ __( escapeHTML( 'color 8' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-8)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-8')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-9' ) && 'active' } data-tip={ __( escapeHTML( 'color 9' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-9)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-9')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-10' ) && 'active' } data-tip={ __( escapeHTML( 'color 10' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-10)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-10')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-11' ) && 'active' } data-tip={ __( escapeHTML( 'color 11' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-11)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-11')}/>
                                    <li className={ ( color == '--digital-newspaper-global-preset-color-12' ) && 'active' } data-tip={ __( escapeHTML( 'color 12' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-12)' }} onClick={()=> setColor('--digital-newspaper-global-preset-color-12')}/>
                                </ul>
                            </div>
                            <ColorPicker
                                color={color}
                                onChange={ ( newColor ) => setColor( newColor ) }
                                enableAlpha
                            />
                            <button type="button" class="components-button is-secondary is-small" onClick={ () => setColor(null) }>{ __( 'Clear', 'digital-newspaper' ) }</button>
                            <Tooltip effect="solid"/>
                        </> }
                    />
                    <Dropdown
                        popoverProps={{resize:false,noArrow:false,flip:true,placement:'bottom-end'}}
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <ColorIndicator
                                className={ hover == null && "null-color" }
                                data-tip={ __( escapeHTML( 'hover' ), 'digital-newspaper' ) }
                                colorValue = { getBackground(hover) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ () => <>
                            <div className="preset-colors">
                                <ul className="preset-colors-inner">
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-1' ) && 'active' } data-tip={ __( escapeHTML( 'color 1' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-1)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-1')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-2' ) && 'active' } data-tip={ __( escapeHTML( 'color 2' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-2)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-2')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-3' ) && 'active' } data-tip={ __( escapeHTML( 'color 3' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-3)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-3')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-4' ) && 'active' } data-tip={ __( escapeHTML( 'color 4' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-4)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-4')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-5' ) && 'active' } data-tip={ __( escapeHTML( 'color 5' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-5)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-5')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-6' ) && 'active' } data-tip={ __( escapeHTML( 'color 6' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-6)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-6')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-7' ) && 'active' } data-tip={ __( escapeHTML( 'color 7' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-7)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-7')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-8' ) && 'active' } data-tip={ __( escapeHTML( 'color 8' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-8)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-8')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-9' ) && 'active' } data-tip={ __( escapeHTML( 'color 9' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-9)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-9')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-10' ) && 'active' } data-tip={ __( escapeHTML( 'color 10' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-10)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-10')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-11' ) && 'active' } data-tip={ __( escapeHTML( 'color 11' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-11)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-11')}/>
                                    <li className={ ( hover == '--digital-newspaper-global-preset-color-12' ) && 'active' } data-tip={ __( escapeHTML( 'color 12' ), 'digital-newspaper' ) } style ={{background: 'var(--digital-newspaper-global-preset-color-12)' }} onClick={()=> setHover('--digital-newspaper-global-preset-color-12')}/>
                                </ul>
                            </div>
                            <ColorPicker
                                color={hover}
                                onChange={ ( newHoverColor ) => setHover( newHoverColor ) }
                                enableAlpha
                            />
                            <button type="button" class="components-button is-secondary is-small" onClick={ () => setHover(null) }>{ __( 'Clear', 'digital-newspaper' ) }</button>
                            <Tooltip effect="solid"/>
                        </> }
                    />
                    <Tooltip effect="solid"/>
                </span>
            </div>
        </div>
    )
}

 // section tab control
const DigitalNewspaperSectionTab = (props) => {
    const { value, setting } = props
    const { choices } = customize.settings.controls[props.setting]

    useEffect (() => {
        onTabChange(value)
    })
    
    function onTabChange(tabName) {
        var sectionName =  wp.customize.control( setting ).section()
        var controlsName = wp.customize.section(sectionName).controls()
        for( var i = 0; i < controlsName.length; i++ ) {
            if( ! controlsName[i].params.tab ) controlsName[i].params.tab = 'general'
            if( controlsName[i].id == 'header_textcolor' ) controlsName[i].params.tab = 'design'
            if( i > 0 && controlsName[i].params.tab ) {
                if(tabName == controlsName[i].params.tab && controlsName[i].params.active ) {
                    controlsName[i].container[0].removeAttribute( "style" )
                } else {
                    controlsName[i].container[0].setAttribute( "style", "display:none" )
                }
            }
        }
    }

    return(
        <TabPanel
            activeClass="active-tab"
            initialTabName={value}
            onSelect={ ( tabName => onTabChange(tabName) ) }
            tabs={ choices }
        >
            { ( tab ) => {
                return;
            }}
        </TabPanel>
    )
}

const DigitalNewspaperIconText = (props) => {
    const [ icon, setIcon ] = useState(props.value.icon)
    const [ text, setText ] = useState(props.value.text)
    const [ choiceIcons, setChoiceIcons ] = useState(customize.control( props.setting ).params.icons)

    useEffect(() => {
        customize.value( props.setting )({ icon: icon, text: text})
    },[icon,text])

    return(
        <div className="field-main">
            <span class="customize-control-title">{ customize.settings.controls[props.setting].label }</span>
            <div className="field-wrap">
                <Dropdown
                    popoverProps={{resize:false,noArrow:false,flip:true,placement:'top-start'}}
                    className="icon-field"
                    renderToggle={ ( { isOpen, onToggle } ) => (
                        <i class={icon}
                        onClick={ onToggle }
                        aria-expanded={ isOpen }></i>
                    ) }
                    renderContent={ () => <div className="icon-picker-modal">
                        { choiceIcons &&
                            choiceIcons.map( choiceIcon => {
                                return(
                                    <i className={choiceIcon} onClick={ () => setIcon(choiceIcon) }></i>
                                )
                            })
                        }
                    </div> }
                />
                <TextControl
                    className="text-field"
                    value={ text }
                    onChange={ ( newText ) => setText( newText ) }
                />
            </div>
        </div>
    )
}

// Render components to html
customize.bind( 'ready', function () {
    // render color group control component
    const colorGroupControls = document.getElementsByClassName( "customize-color-group-control" )
    for( let colorGroupControl of colorGroupControls ) {
        const setting = colorGroupControl.getAttribute( 'data-setting' );
        const settingValue =  JSON.parse( customize.settings.settings[setting].value )
        if( colorGroupControl ) {
            render( <DigitalNewspaperColorGroup value={settingValue} setting={setting}/>, colorGroupControl )
        }
    }
    
    // render toggle button control
    const toggleButtonControls = document.getElementsByClassName( "customize-toggle-button-control" )
    for( let toggleButtonControl of toggleButtonControls ) {
        const setting = toggleButtonControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( toggleButtonControl ) {
            render( <DigitalNewspaperToggleButton value={settingValue} setting={setting}/>, toggleButtonControl )
        }
    }

    // render toggle button control
    const simpleToggleButtonControls = document.getElementsByClassName( "customize-simple-toggle-control" )
    for( let simpleToggleButtonControl of simpleToggleButtonControls ) {
        const setting = simpleToggleButtonControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( simpleToggleButtonControl ) {
            render( <DigitalNewspaperSimpleToggleButton value={settingValue} setting={setting}/>, simpleToggleButtonControl )
        }
    }

    // radio-tab control component
    const radioTabControls = document.getElementsByClassName( "customize-radio-tab-control" )
    for( let radioTabControl of radioTabControls ) {
        const setting = radioTabControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( radioTabControl ) {
            render( <DigitalNewspaperRadioTab value={settingValue} setting={setting}/>, radioTabControl )
        }
    }

    // radio-bubble control component
    const radioBubbleControls = document.getElementsByClassName( "customize-radio-bubble-control" )
    for( let radioBubbleControl of radioBubbleControls ) {
        const setting = radioBubbleControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( radioBubbleControl ) {
            render( <DigitalNewspaperRadioBubble value={settingValue} setting={setting}/>, radioBubbleControl )
        }
    }

    // responsive multi select tab control component
    const responsiveMultiselectTabControls = document.getElementsByClassName( "customize-responsive-multiselect-tab-control" )
    for( let responsiveMultiselectTabControl of responsiveMultiselectTabControls ) {
        const setting = responsiveMultiselectTabControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( responsiveMultiselectTabControl ) {
            render( <DigitalNewspaperResponsiveMultiselectTab value={settingValue} setting={setting}/>, responsiveMultiselectTabControl )
        }
    }

    // render color picker control component
    const colorPickerControls = document.getElementsByClassName( "customize-color-picker-control" )
    for( let colorPickerControl of colorPickerControls ) {
        const setting = colorPickerControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( colorPickerControl ) {
            render( <DigitalNewspaperColorPicker value={settingValue} setting={setting}/>, colorPickerControl )
        }
    }

    // render preset color picker control component
    const presetColorPickerControls = document.getElementsByClassName( "customize-preset-color-picker-control" )
    for( let presetColorPickerControl of presetColorPickerControls ) {
        const setting = presetColorPickerControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( presetColorPickerControl ) {
            render( <DigitalNewspaperPresetColorPicker value={settingValue} setting={setting}/>, presetColorPickerControl )
        }
    }

    // render preset gradient picker control component
    const presetGradientPickerControls = document.getElementsByClassName( "customize-preset-gradient-picker-control" )
    for( let presetGradientPickerControl of presetGradientPickerControls ) {
        const setting = presetGradientPickerControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( presetGradientPickerControl ) {
            render( <DigitalNewspaperPresetGradientPicker value={settingValue} setting={setting}/>, presetGradientPickerControl )
        }
    }

    // render colors with image group control component
    const colorImageGroupControls = document.getElementsByClassName( "customize-color-image-group-control" )
    for( let colorImageGroupControl of colorImageGroupControls ) {
        const setting = colorImageGroupControl.getAttribute( 'data-setting' );
        const settingValue =  JSON.parse(customize.settings.settings[setting].value)
        if( colorImageGroupControl ) {
            render( <DigitalNewspaperColorImageGroup value={settingValue} setting={setting}/>, colorImageGroupControl )
        }
    }
    
    // render range control component
    const rangeControls = document.getElementsByClassName( "customize-range-control" )
    for( let rangeControl of rangeControls ) {
        const setting = rangeControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( rangeControl ) {
            render( <DigitalNewspaperRange value={settingValue} setting={setting}/>, rangeControl )
        }
    }

    // render responsive range control component
    const responsiveRangeControls = document.getElementsByClassName( "customize-responsive-range-control" )
    for( let responsiveRangeControl of responsiveRangeControls ) {
        const setting = responsiveRangeControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( responsiveRangeControl ) {
            render( <DigitalNewspaperRangeResponsive value={settingValue} setting={setting}/>, responsiveRangeControl )
        }
    }

    // render responsive box control component
    const responsiveBoxControls = document.getElementsByClassName( "customize-responsive-box-control" )
    for( let responsiveBoxControl of responsiveBoxControls ) {
        const setting = responsiveBoxControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( responsiveBoxControl ) {
            render( <DigitalNewspaperResponsiveBox value={settingValue} setting={setting}/>, responsiveBoxControl )
        }
    }

    // render multicheckbox control component
    const multiselectControls = document.getElementsByClassName( "customize-multiselect-control" )
    for( let multiselectControl of multiselectControls ) {
        const setting = multiselectControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( multiselectControl ) {
            render( <DigitalNewspaperMultiselect value={settingValue} setting={setting}/>, multiselectControl )
        }
    }

    // render posts multicheckbox control component
    const postsMultiselectControls = document.getElementsByClassName( "customize-posts-multiselect-control" )
    for( let postsMultiselectControl of postsMultiselectControls ) {
        const setting = postsMultiselectControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( postsMultiselectControl ) {
            render( <DigitalNewspaperPostsMultiselect value={settingValue} setting={setting}/>, postsMultiselectControl )
        }
    }

    // render categories multicheckbox control component
    const categoriesMultiselectControls = document.getElementsByClassName( "customize-categories-multiselect-control" )
    for( let categoriesMultiselectControl of categoriesMultiselectControls ) {
        const setting = categoriesMultiselectControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( categoriesMultiselectControl ) {
            render( <DigitalNewspaperCategoriesMultiselect value={settingValue} setting={setting}/>, categoriesMultiselectControl )
        }
    }

    // render checkbox control component
    const checkboxControls = document.getElementsByClassName( "customize-checkbox-control" )
    for( let checkboxControl of checkboxControls ) {
        const setting = checkboxControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( checkboxControl ) {
            render( <DigitalNewspaperCheckbox value={settingValue} setting={setting}/>, checkboxControl )
        }
    }

    // render block repeater control component
    const blockRepeaterControls = document.getElementsByClassName( "customize-block-repeater-control" )
    for( let blockRepeaterControl of blockRepeaterControls ) {
        const setting = blockRepeaterControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( blockRepeaterControl ) {
            render( <DigitalNewspaperBlockRepeater value={settingValue} setting={setting}/>, blockRepeaterControl )
        }
    }

    // render block item sortable control component
    const itemSortableControls = document.getElementsByClassName( "customize-item-sortable-control" )
    for( let itemSortableControl of itemSortableControls ) {
        const setting = itemSortableControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( itemSortableControl ) {
            render( <DigitalNewspaperItemSort value={settingValue} setting={setting}/>, itemSortableControl )
        }
    }

    // render block typography control component
    const typographyControls = document.getElementsByClassName( "customize-typography-control" )
    for( let typographyControl of typographyControls ) {
        const setting = typographyControl.getAttribute( 'data-setting' );
        const settingValue = customize.settings.settings[setting].value
        if( typographyControl ) {
            render( <DigitalNewspaperTypography value={settingValue} setting={setting}/>, typographyControl )
        }
    }

    // render block box shadow control component
    const boxShadowControls = document.getElementsByClassName( "customize-box-shadow-control" )
    for( let boxShadowControl of boxShadowControls ) {
        const setting = boxShadowControl.getAttribute( 'data-setting' );
        const settingValue = customize.settings.settings[setting].value
        if( boxShadowControl ) {
            render( <DigitalNewspaperBoxShadow value={settingValue} setting={setting}/>, boxShadowControl )
        }
    }

    // render color group color an hover color picker control component
    const colorGroupPickerControls = document.getElementsByClassName( "customize-color-group-picker-control" )
    for( let colorGroupPickerControl of colorGroupPickerControls ) {
        const setting = colorGroupPickerControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( colorGroupPickerControl ) {
            render( <DigitalNewspaperColorGroupPicker value={settingValue} setting={setting}/>, colorGroupPickerControl )
        }
    }

    // render section tab control component
    const sectionTabControls = document.getElementsByClassName( "customize-section-tab-control" )
    for( let sectionTabControl of sectionTabControls ) {
        const setting = sectionTabControl.getAttribute( 'data-setting' );
        const settingValue = customize.settings.settings[setting].value
        if( sectionTabControl ) {
            render( <DigitalNewspaperSectionTab value={settingValue} setting={setting}/>, sectionTabControl )
        }
    }

    // render icon-text control component
    const iconTextControls = document.getElementsByClassName( "customize-icon-text-control" )
    for( let iconTextControl of iconTextControls ) {
        const setting = iconTextControl.getAttribute( 'data-setting' );
        const settingValue = customize.settings.settings[setting].value
        if( iconTextControl ) {
            render( <DigitalNewspaperIconText value={settingValue} setting={setting}/>, iconTextControl )
        }
    }

    // render border control component
    const borderControls = document.getElementsByClassName( "customize-border-control" )
    for( let borderControl of borderControls ) {
        const setting = borderControl.getAttribute( 'data-setting' );
        const settingValue = customize.settings.settings[setting].value
        if( borderControl ) {
            render( <DigitalNewspaperBorder value={settingValue} setting={setting}/>, borderControl )
        }
    }

    // render upsell control
    const upsellControls = document.getElementsByClassName( "customize-upsell-control" )
    for( let upsellControl of upsellControls ) {
        const setting = upsellControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( upsellControl ) {
            render( <DigitalNewspaperUpsellWithPreview value={settingValue} setting={setting}/>, upsellControl )
        }
    }

    // render info box control
    const infoBoxControls = document.getElementsByClassName( "customize-info-box-control" )
    for( let infoBoxControl of infoBoxControls ) {
        const setting = infoBoxControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( infoBoxControl ) {
            render( <DigitalNewspaperInfoBox value={settingValue} setting={setting}/>, infoBoxControl )
        }
    }

    // render info box control
    const infoBoxActionControls = document.getElementsByClassName( "customize-info-box-action-control" )
    for( let infoBoxActionControl of infoBoxActionControls ) {
        const setting = infoBoxActionControl.getAttribute( 'data-setting' );
        const settingValue =  customize.settings.settings[setting].value
        if( infoBoxActionControl ) {
            render( <DigitalNewspaperInfoBoxAction value={settingValue} setting={setting}/>, infoBoxActionControl )
        }
    }

    ///  Handle the user interface 
    const sectionsArray = [ 'digital_newspaper_full_width_section', 'digital_newspaper_leftc_rights_section', 'digital_newspaper_lefts_rightc_section', 'digital_newspaper_bottom_full_width_section' ]
    sectionsArray.forEach(function(section) {
        customize.section(section).expanded.bind(function (isExpanded) {
            if( isExpanded ) {
                wp.customize.control( 'homepage_content_order' ).section(section)
            } else {
                wp.customize.control( 'homepage_content_order' ).section( 'digital_newspaper_front_sections_reorder_section' )
            }
        })
    })
})