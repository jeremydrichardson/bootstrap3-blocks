/**
 * BLOCK: bootstrap3-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls } = wp.editor;
const { PlainText, InnerBlocks } = wp.blockEditor;
const { TextControl, ToggleControl, Panel, PanelBody, PanelRow, FormToggle } = wp.components;
const { Fragment } = wp.element;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'jeremydrichardson/bootstrap3-panel-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Bootstrap 3 - Panel Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap 3 blocks' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		heading: {
			source: "text",
			selector: ".panel-heading"
		},
		body: {
			type: "array",
			source: "children",
			selector: ".panel-body"
		},
		parentClass: {
			type: "text",
		},
		id: {
			type: "text",
		},
		groupID: {
			type: "text",
		},
		collapse: {
			type: "boolean",
			default: false
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		// Creates a <p class='wp-block-cgb-block-bootstrap3-blocks'></p>.

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title="Bootstrap">
						<PanelRow>
							<label htmlFor="collapse">Collapse</label>
							<FormToggle
								id="collapse"
								label="Collapse"
								checked={ props.attributes.collapse }
								onChange={ () => props.setAttributes( { collapse: ! props.attributes.collapse }) }
							/>
						</PanelRow>
						
						<PanelRow>
							<label>ID</label>
							<PlainText
								onChange={content => props.setAttributes({ id: content })}
								value={props.attributes.id}
							/>
						</PanelRow>
						<PanelRow>
							<label>Group ID</label>
							<PlainText
								onChange={content => props.setAttributes({ groupID: content })}
								value={props.attributes.groupID}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div className={`${ props.className } panel panel-default`}>
					<div className="panel-heading">
						<PlainText
							onChange={content => props.setAttributes({ heading: content })}
							value={props.attributes.heading}
							placeholder="Heading"
						/>
					</div>
					<div className="panel-body">
						<InnerBlocks />
					</div>
				</div>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		console.log(props.attributes.collapse);
		if (props.attributes.collapse) {
			return (
				<div className="panel panel-default">
					<div className="panel-heading" role="tab" id={`heading-${props.attributes.id}`}>
						<a role="button" data-toggle="collapse" data-parent={props.attributes.groupID} href={`#collapse-${props.attributes.id}`} aria-expanded="false" aria-controls={`collapse-${props.attributes.id}`}>
							{props.attributes.heading}
						</a>
					</div>
					<div id={`collapse-${props.attributes.id}`} class="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading-${props.attributes.id}`}>
						<div className="panel-body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="panel panel-default">
					<div className="panel-heading">
						{props.attributes.heading}
					</div>
					<div className="panel-body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		}
	},
} );
