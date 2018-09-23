import { Watch } from 'vue-property-decorator';
import { GenericFormField } from './GenericFormField';

/**
 * This defines a Generically Typed Input Form Field Abstract
 * Provides functionality for handling an update of a value in the vent of model binding and basic fields
 */

export abstract class GenericInputField<T> extends GenericFormField<T> {
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

