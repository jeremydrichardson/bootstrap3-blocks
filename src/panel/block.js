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
const { RichText, PlainText } = wp.editor;
const { useSelect } = wp.data;

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
			selector: ".panel-heading a"
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
		const parentClass = wp.data.select("core/block-editor").getBlockAttributes(wp.data.select("core/block-editor").getBlockRootClientId(props.clientId)).className;
		props.setAttributes({ parentClass: parentClass });

		props.setAttributes({ id: 'panel-' + props.clientId});

		// Creates a <p class='wp-block-cgb-block-bootstrap3-blocks'></p>.
		return (
			<div className={ props.className }>
				<PlainText
					onChange={content => props.setAttributes({ heading: content })}
					value={props.attributes.heading}
					placeholder="Heading"
				/>
				<RichText
					onChange={content => props.setAttributes({ body: content })}
					value={props.attributes.body}
					placeholder="Body content"
				/>
			</div>
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
		const parentClassArray = props.attributes.parentClass.split(' ');
		const parentClassArrayDot = parentClassArray.map( function (e) {
			return '.' + e;
		});
		const parentClassString = parentClassArrayDot.join(' ');
		return (
			<div className="panel panel-default">
				<div className="panel-heading" role="tab">
					<h4 className="panel-title">
						<a role="button" data-toggle="collapse" data-parent={parentClassString} data-target={'#' + props.attributes.id}>
							{props.attributes.heading}
						</a>
					</h4>
				</div>
				<div class="collapse" role="tabpanel" id={props.attributes.id}>
					<div className="panel-body">
						{props.attributes.body}
					</div>
				</div>
			</div>
		);
	},
} );
