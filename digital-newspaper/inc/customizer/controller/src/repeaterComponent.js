const { Card, CardHeader, CardBody, ToggleControl, TextControl, Button, SelectControl, Dashicon, FormTokenField, Dropdown, CheckboxControl, RangeControl, ResponsiveWrapper, ButtonGroup, TextareaControl } = wp.components
const { useState, useEffect } = wp.element;
const { escapeHTML } = wp.escapeHtml;
const { __ } = wp.i18n;
const { customize } = wp;
const { MediaUpload } = wp.blockEditor;
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import Select from 'react-select'

import AsyncSelect from 'react-select/async'
var ajaxurl = customizerControlsObject.ajaxUrl, _wpnonce = customizerControlsObject._wpnonce;

import { __experimentalNumberControl as NumberControl } from '@wordpress/components';

// Block repeater control 
export const DigitalNewspaperBlockRepeater = ( props ) =>  {
    const [ repeater, setRepeater ] = useState( JSON.parse( props.value ) ),
        { label, description } = customize.settings.controls[ props.setting ]

    useEffect(() => {
        customize.value( props.setting )( JSON.stringify( repeater ) )
    }, [ repeater ]);

    const onSortEnd = ( e ) => {
        setRepeater(( prev ) => {
            return arrayMoveImmutable( prev, e.oldIndex, e.newIndex )
        })
    }

    function updateValue( key, block ) {
        setRepeater( prev => {
            const newRepeater = [ ...prev ];
            newRepeater[ key ] = block;
            return newRepeater;
        });
    }

    return (
        <>
            <label className="customize-control-title">{ label }</label>
            <span className="customize-control-description">{ description }</span>
            <BlockSortableList
                onSortEnd = { onSortEnd }
                hideSortableGhost = { false }
                repeater = { repeater }
                updateValue = { updateValue }
            />
        </>
    )
}

const PostBlock = ( props ) => {
    const { block, itemKey, updateValue } = props,
        [ responsiveIcon, setResponsiveIcon ] = useState( 'desktop' ),
        [ option, setOption ] = useState( block.option ),
        [ visible, setVisible ] = useState( block.option ),
        [ title, setTitle ] = useState( block.title ),
        [ uniqueId, setUniqueId ] = useState( block.uniqueId || Date.now().toString() + generateRandomLetter() ),
        [ blockId, setBlockId ] = useState( block.blockId ),
        [ thumbOption, setThumbOption ] = useState( block.thumbOption ),
        [ dateOption, setDateOption ] = useState( block.dateOption ),
        [ authorOption, setAuthorOption ] = useState( block.authorOption ),
        [ categoryOption, setCategoryOption ] = useState( block.categoryOption ),
        [ commentOption, setCommentOption ] = useState( block.commentOption ),
        [ excerptOption, setExcerptOption ] = useState( block.excerptOption ),
        [ excerptLength, setExcerptLength ] = useState( block.excerptLength ),
        [ query, setQuery ] = useState( block.query ),
        [ buttonOption, setButtonOption ] = useState( block.buttonOption ),
        [ viewallOption, setViewallOption ] = useState( block.viewallOption ),
        [ viewallUrl, setViewallUrl ] = useState( block.viewallUrl ),
        [ column, setColumn ] = useState( block.column || 'two' ),
        [ columns, setColumns ] = useState( block.columns || 4 ),
        [ dots, setDots ] = useState( block.dots ),
        [ loop, setLoop ] = useState( block.loop ),
        [ arrows, setArrows ] = useState( block.arrows ),
        [ auto, setAuto ] = useState( block.auto ),
        [ layout, setLayout ] = useState( block.layout )
    
    const triggerDevice = ( device ) => {
        if( device == 'mobile' ) {
            setResponsiveIcon( 'smartphone' )
        } else {
            setResponsiveIcon( device )
        }
    }

    useEffect(() => {
        const resFooter = document.getElementById( "customize-footer-actions" )
        const resFooterClass =  resFooter.getElementsByClassName( "devices-wrapper" )
        const buttons = resFooterClass[0].getElementsByTagName( "button" )
        for(  const button of buttons ) {
            button.addEventListener( "click", function() {
                const currentDevice =  button.getAttribute( "data-device" )
                triggerDevice( currentDevice )
            })
        }
    },[])

    // update parent value
    useEffect(() => {
        let postBlockData = {
            'type': block.type,
            'option': option,
            'title': title,
            'blockId': blockId,
            'uniqueId': uniqueId,
            'dateOption': dateOption,
            'authorOption': authorOption,
            'categoryOption': categoryOption,
            'commentOption': commentOption,
            'excerptOption': excerptOption,
            'excerptLength': excerptLength,
            'query': query,
            'buttonOption': buttonOption,
            'viewallOption': viewallOption,
            'viewallUrl': viewallUrl,
            'layout': layout
        }
        if( block.type == 'news-list' || block.type == 'news-grid' ) {
            postBlockData.column = column
            postBlockData.thumbOption = thumbOption
        }
        if( block.type == 'news-carousel' ) {
            postBlockData.columns = columns
            postBlockData.dots = dots
            postBlockData.loop = loop
            postBlockData.arrows = arrows
            postBlockData.auto = auto
        }
        updateValue( itemKey, postBlockData )
    }, [ option, title, blockId, dateOption, authorOption, categoryOption, commentOption, excerptOption, excerptLength, buttonOption, viewallOption, viewallUrl, thumbOption, column, columns, layout, query, dots, loop, arrows, auto ])

    return (
        <div className={ `block-item block--${ block.option ? "visibility" : "hidden" }` } elevation={ 4 } isRounded={ false } size="x-small">
            <div className="block-header">
                <span className="control-title">{ escapeHTML( block.type.replace( '-', ' ' ) ) }</span>
                <Dropdown
                    popoverProps = {{ resize:false, noArrow:false, flip:true, placement:'bottom-start' }}
                    renderToggle = {({ isOpen, onToggle }) => (
                        <span className="setting-icon dashicons dashicons-admin-generic" onClick={ onToggle } aria-expanded={ isOpen }></span>
                    )}
                    renderContent={ () => <div className="block-content">
                        <TextControl
                            label = { __( escapeHTML( 'Block Title' ), 'digital-newspaper' ) }
                            value = { title }
                            onChange = { ( newValue ) => setTitle( newValue ) }
                        />
                        { ( block.type == 'news-list' || block.type == 'news-grid' ) &&
                            <ToggleControl
                                label = { __( escapeHTML( 'Show post thumbnail' ), 'digital-newspaper' ) }
                                checked = { thumbOption }
                                onChange = { ( newToggle ) => setThumbOption( newToggle ) }
                            />
                        }
                        <ToggleControl
                            label = { __( escapeHTML( 'Show post date' ), 'digital-newspaper' ) }
                            checked = { dateOption }
                            onChange = { ( newToggle ) => setDateOption( newToggle ) }
                        />
                        <ToggleControl
                            label = { __( escapeHTML( 'Show post author' ), 'digital-newspaper' ) }
                            checked = { authorOption }
                            onChange = { ( newToggle ) => setAuthorOption( newToggle ) }
                        />
                        <ToggleControl
                            label = { __( escapeHTML( 'Show post category' ), 'digital-newspaper' ) }
                            checked = { categoryOption }
                            onChange = { ( newToggle ) => setCategoryOption( newToggle ) }
                        />
                        <ToggleControl
                            label = { __( escapeHTML( 'Show post comment' ), 'digital-newspaper' ) }
                            checked = { commentOption }
                            onChange = { ( newToggle ) => setCommentOption( newToggle ) }
                        />
                        {( block.type != 'news-carousel' && block.type != 'news-filter' ) &&
                            <ToggleControl
                                label = { __( escapeHTML( 'Show read more button' ), 'digital-newspaper' ) }
                                checked = { buttonOption }
                                onChange = { ( newToggle ) => setButtonOption( newToggle ) }
                            />
                        }
                        <PostQuery query={ block.query } setParentQuery={ setQuery } />
                        <ToggleControl
                            label = { __( escapeHTML( 'Show view all icon' ), 'digital-newspaper' ) }
                            checked = { viewallOption }
                            onChange = { ( newToggle ) => setViewallOption( newToggle ) }
                        />
                        <TextControl
                            label = { __( escapeHTML( 'Block ID Attribute' ), 'digital-newspaper' ) }
                            value = { blockId }
                            onChange = { (  newValue  ) => setBlockId( newValue ) }
                        />
                    </div>}
                />
                <span className={ `display-icon dashicons dashicons-${ block.option ? "visibility" : "hidden" }` } onClick={() => setOption( ! option )}></span>
            </div>
        </div>
    )
}

const PostAdBlock = ( props ) => {
    const { block, itemKey, updateValue } = props,
        [ option, setOption ] = useState( block.option ),
        [ media, setMedia ] = useState( block.media ),
        [ url, setUrl ] = useState( block.url ),
        [ targetAttr, setTargetAttr ] = useState( block.targetAttr ),
        [ relAttr, setRelAttr ] = useState( block.relAttr ),
        [ blockId, setBlockId ] = useState( block.blockId )
    
    // update parent value
    useEffect(() => {
        let postBlockData = {
            'type': block.type,
            'option': option,
            'media': media,
            'url': url,
            'targetAttr': targetAttr,
            'relAttr': relAttr,
            'blockId': blockId
        }
        updateValue( itemKey, postBlockData )
    }, [ option, media, url, targetAttr, relAttr, blockId ])

    const removeMedia = () => {
		setMedia({
			media_id: 0,
			media_url: ''
		});
	}

    const onSelectMedia = ( newMedia ) => {
		setMedia({
			media_id: newMedia.id,
			media_url: newMedia.url
		});
	}

    return (
        <div className={ `block-item block--${ option ? "visibility" : "hidden" }` } elevation={ 4 } isRounded={ false } size="x-small">
            <div className="block-header">
                <span className="control-title">{ escapeHTML( block.type.replace( '-', ' ' ) ) }</span>
                <Dropdown
                        popoverProps = {{ resize:false, noArrow:false, flip:true, placement:'bottom-start' }}
                        renderToggle = {({ isOpen, onToggle }) => (
                            <span className="setting-icon dashicons dashicons-admin-generic" onClick={ onToggle } aria-expanded={ isOpen }></span>
                        )}
                        renderContent={() => 
                            <div className="block-content">
                                <div className="media-field">
                                    <MediaUpload
                                        onSelect = { onSelectMedia }
                                        value = { media.media_id }
                                        allowedTypes = {[ 'image' ]}
                                        render = {({ open }) => (
                                            <Button 
                                                className = { media.media_id == 0 ? 'media-field-image__toggle' : 'media-field-image__preview' }
                                                onClick = { open }
                                            >
                                                { media.media_id == 0 && __( 'Upload an image', 'digital-newspaper' )}
                                                { media != undefined && 
                                                    <ResponsiveWrapper
                                                        naturalWidth = { 200 }
                                                        naturalHeight = { 200 }
                                                    >
                                                        <img src={ media.media_url } />
                                                    </ResponsiveWrapper>
                                                }
                                            </Button>
                                        )}
                                    />
                                    { media.media_id != 0 && 
                                        <MediaUpload
                                            title = { __( 'Replace image', 'digital-newspaper' ) }
                                            value = { media.media_id }
                                            onSelect = { onSelectMedia }
                                            allowedTypes = {[ 'image' ]}
                                            render = {({ open }) => (
                                                <Button onClick={ open } variant="secondary" isLink isLarge>{ __( 'Replace image', 'digital-newspaper' ) }</Button>
                                            )}
                                        />
                                    }
                                    { media.media_id != 0 && 
                                        <Button onClick={ removeMedia } isLink isDestructive>{ __( 'Remove image', 'digital-newspaper' ) }</Button>
                                    }
                                </div>
                                <TextControl
                                    label = { __( escapeHTML( 'URL' ), 'digital-newspaper' ) }
                                    value = { url }
                                    onChange = {( newUrl ) => setUrl( newUrl )}
                                />
                                <SelectControl
                                    label = { __( escapeHTML( 'Ad link open in' ), 'digital-newspaper' ) }
                                    value = { targetAttr }
                                    options = {[
                                        { label: __( escapeHTML( 'Open link in new tab' ), 'digital-newspaper' ), value: '_blank' },
                                        { label: __( escapeHTML( 'Open link in same tab' ), 'digital-newspaper' ), value: '_self' }
                                    ]}
                                    onChange = {( newTargetAttr ) => setTargetAttr( newTargetAttr )}
                                />
                                <SelectControl
                                    label = { __( escapeHTML( 'Link rel attribute value' ), 'digital-newspaper' ) }
                                    value = { relAttr }
                                    options = {[
                                        { label: __( escapeHTML( 'nofollow' ), 'digital-newspaper' ), value: 'nofollow' },
                                        { label: __( escapeHTML( 'noopener' ), 'digital-newspaper' ), value: 'noopener' },
                                        { label: __( escapeHTML( 'noreferrer' ), 'digital-newspaper' ), value: 'noreferrer' }
                                    ]}
                                    onChange = {( newRelAttr ) => setRelAttr( newRelAttr )}
                                />
                                <TextControl
                                    label = { __( escapeHTML( 'Block ID Attribute' ), 'digital-newspaper' ) }
                                    value = { blockId }
                                    onChange = {( newValue ) => setBlockId( newValue )}
                                />
                            </div>
                        }
                    />
                <span className={ `display-icon dashicons dashicons-${ option ? "visibility" : "hidden" }` } onClick={() => setOption( ! option )}></span>
            </div>
        </div>
    )
}

const PostQuery = (props) => {
    const { query, setParentQuery } = props,
        [ order, setOrder ] = useState( query.order ),
        [ count, setCount ] = useState( query.count ),
        [ postFilter, setPostFilter ] = useState( query.postFilter ),
        [ dateFilter, setDateFilter ] = useState( query.dateFilter ),
        [ categories, setCategories ] = useState( query.categories ),
        [ posts, setPosts ] = useState( query.posts ),
        [ ids, setIds ] = useState( query.ids ),
        choices = customizerControlsObject.categories,
        postChoices = customizerControlsObject.posts

    useEffect(() => {
        setParentQuery({ 
            order: order,
            count: count,
            categories: categories,
            posts: posts,
            postFilter: postFilter,
            dateFilter: dateFilter,
            ids: ids
        })
    }, [ order, count, ids, postFilter, dateFilter, posts, categories ])

    const getPosts = async ( key ) => {
        let postsArray = []
        await jQuery.ajax({
            method: 'post',
            url: ajaxurl,
            data: ({
                'action': 'digital_newspaper_get_multicheckbox_posts_simple_array',
                '_wpnonce': _wpnonce,
                'search': key
            }),
            success: function( response ) {
                if( response.data ) postsArray = response.data
            }
        })
        return postsArray
    }

    const promiseOptions = ( inputValue ) => new Promise(( resolve ) => {
        setTimeout(() => {
            resolve(
                getPosts( inputValue )
            );
        }, 1000);
    });

    const getCategories = async ( key ) => {
        let postsArray = []
        await jQuery.ajax({
            method: 'post',
            url: ajaxurl,
            data: ({
                'action': 'digital_newspaper_get_multicheckbox_categories_simple_array',
                '_wpnonce': _wpnonce,
                'search': key
            }),
            success: function( response ) {
                if( response.data ) postsArray = response.data
            }
        })
        return postsArray
    }

    const categoriesPromiseOptions = ( inputValue ) => new Promise(( resolve ) => {
        setTimeout(() => {
            resolve(
                getCategories( inputValue )
            );
        }, 1000);
    });

    return (
        <div className="post-query-field">
            <label className="post-query-field-label">{ __( escapeHTML( 'Posts query' ), 'digital-newspaper' ) }</label>
            <div>
                <Dropdown
                    popoverProps = {{ resize:false, noArrow:false, flip:true, placement:'top-start' }}
                    renderToggle = {({ isOpen, onToggle }) => (
                        <Dashicon
                            className = "popover-trigger"
                            icon = "edit" 
                            onClick = { onToggle }
                            aria-expanded = { isOpen }
                        />
                    )}
                    renderContent= {() =>
                        <Card>
                            <CardBody>
                                <SelectControl
                                    label = { __( escapeHTML( 'Orderby' ), 'digital-newspaper' ) }
                                    value = { order }
                                    options = { [
                                        { label: __( escapeHTML( 'Newest - Oldest' ), 'digital-newspaper' ), value: 'date-desc' },
                                        { label: __( escapeHTML( 'Oldest - Newest' ), 'digital-newspaper' ), value: 'date-asc' },
                                        { label: __( escapeHTML( 'A - Z' ), 'digital-newspaper' ), value: 'title-asc' },
                                        { label: __( escapeHTML( 'Z - A' ), 'digital-newspaper' ), value: 'title-desc' },
                                        { label: __( escapeHTML( 'Random' ), 'digital-newspaper' ), value: 'rand-desc' }
                                    ] }
                                    onChange = { ( newOrder ) => setOrder( newOrder ) }
                                />
                                { postFilter == 'category' && 
                                    <>
                                        <NumberControl
                                            label = { __( escapeHTML( 'Number of posts to display' ), 'digital-newspaper' ) }
                                            isShiftStepEnabled = { true }
                                            onChange = { ( newNumber ) => setCount( newNumber ) }
                                            shiftStep = { 5 }
                                            value = { count }
                                        />
                                        <FormTokenField
                                            label = { __( escapeHTML( 'Exclude post ids' ), 'digital-newspaper' ) }
                                            value = { ids }
                                            onChange = { ( newids ) => setIds( newids ) }
                                        />
                                    </>
                                }
                                <div className="radio-bubbles column-2">
                                    <span className={ postFilter == 'category' ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setPostFilter( 'category' )}> {__( escapeHTML( 'By category' ), 'digital-newspaper' ) }</span>
                                    <span className={ postFilter == 'title' ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setPostFilter( 'title' )}> {__( escapeHTML( 'By title' ), 'digital-newspaper' ) }</span>
                                </div>
                                {( choices && categories && ( postFilter == 'category' ) ) && 
                                    <AsyncSelect
                                        isMulti = { true }
                                        inputId = "digital-newspaper-search-in-select"
                                        isSearchable  ={ true }
                                        heading = { __( escapeHTML( 'Posts categories' ), 'digital-newspaper' ) }
                                        placeholder = { __( escapeHTML( 'Type to search . . ' ), 'digital-newspaper' ) }
                                        value = { categories }
                                        defaultOptions = { choices }
                                        loadOptions = { categoriesPromiseOptions }
                                        onChange = { ( newPosts ) => setCategories( newPosts ) }
                                    />
                                }
                                {  postFilter == 'title' &&
                                    <AsyncSelect
                                        isMulti = { true }
                                        inputId = "digital-newspaper-search-in-select"
                                        isSearchable = { true }
                                        heading = { __( escapeHTML( 'Posts titles' ), 'digital-newspaper' ) }
                                        placeholder = { __( escapeHTML( 'Type to search . . ' ), 'digital-newspaper' ) }
                                        value = { posts }
                                        defaultOptions = { postChoices }
                                        loadOptions = { promiseOptions }
                                        onChange = { ( newPosts ) => setPosts( newPosts ) }
                                    />
                                }
                                { postFilter == 'category' && 
                                    <div className="radio-bubbles column-4">
                                        <span className={ dateFilter == 'all' ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setDateFilter( 'all' ) }>{ __( escapeHTML( 'All' ), 'digital-newspaper' ) }</span>
                                        <span className={ dateFilter == 'last-seven-days' ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setDateFilter( 'last-seven-days' ) }>{ __( escapeHTML( 'Last 7 days' ), 'digital-newspaper' ) }</span>
                                        <span className={ dateFilter == 'today' ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setDateFilter( 'today' ) }>{ __( escapeHTML( 'Today' ), 'digital-newspaper' ) }</span>
                                        <span className={ dateFilter == 'this-week' ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setDateFilter( 'this-week' ) }>{ __( escapeHTML( 'This Week' ), 'digital-newspaper' ) }</span>
                                        <span className={ dateFilter == 'last-week' ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setDateFilter( 'last-week' ) }>{ __( escapeHTML( 'Last Week' ), 'digital-newspaper' ) }</span>
                                        <span className={ dateFilter == 'this-month' ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setDateFilter( 'this-month' ) }>{ __( escapeHTML( 'This Month' ), 'digital-newspaper' ) }</span>
                                        <span className={ dateFilter == 'last-month' ? 'radio-bubble isActive' : 'radio-bubble isItem' } onClick={() => setDateFilter( 'last-month' ) }>{ __( escapeHTML( 'Last Month' ), 'digital-newspaper' ) }</span>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    }
                />
            </div>
        </div>
    )
}

const blockSortList = ( props ) => {
    const { repeater, updateValue } = props
    return (
        <div className="blocks-wrap">
            { repeater &&
                repeater.map(( block, index ) => {
                    return(
                        <BlockSortableItem
                            key = { block.uniqueId || index }
                            index = { index }
                            itemKey = { index }
                            block = { block }
                            updateValue = { updateValue }
                        />
                    )
                })
            }
        </div>
    );
};

const blockSortItem = ( props ) => {
    const { block, itemKey, updateValue } = props
    switch( block.type ) {
        case "ad-block": 
            return <PostAdBlock
                block = { block }
                itemKey = { itemKey }
                updateValue = { updateValue }
            />
            break;
        default: 
            return <PostBlock
                block = { block }
                itemKey = { itemKey }
                updateValue = { updateValue }
            />
    }
}

const BlockSortableList = SortableContainer( blockSortList ),
    BlockSortableItem = SortableElement( blockSortItem );

function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[ Math.floor( Math.random() * alphabet.length ) ]
}