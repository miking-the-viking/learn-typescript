import Vue from 'vue';
import { Watch } from 'vue-property-decorator';

/**
 * This defines a Generically Typed Input Abstract
 * Provides functionality for handling an update of a value in the vent of model binding and basic fields
 */

export abstract class GenericInput<T> extends Vue {

	public id: string = '';
	public name: string = '';
	public value: null | T = null;
	public required: boolean = false;
	public disabled: boolean = false;
	public label: string = '';

	/**
	 * handleChange emits an input event for the field,
	 * allowing for the GenericInput to be initialized with v-model binding
	 * @param value vale of the event
	 */
	@Watch('value', {
		immediate: true
	})
	public handleChange(value: T) {
		this.$emit('input', value);
	}
}

