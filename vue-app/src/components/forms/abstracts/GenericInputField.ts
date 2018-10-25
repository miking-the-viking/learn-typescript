import { Watch } from 'vue-property-decorator';
import { GenericFormField } from './GenericFormField';

/**
 * This defines a Generically Typed Input Form Field Abstract
 * Provides functionality for handling an update of a value in the vent of model binding and basic fields
 */

export abstract class GenericInputField<T> extends GenericFormField<T> {

	@Watch('value')
	private handleValuePropUpdate(newVal: string) {
		this.valueRef = this.value as T;
	}

	/**
	 * use valueRef as the bound value
	 */
	get valueRef() {
		return this.value as T;
	}
	set valueRef(newValue: T) {
		this.$emit('input', newValue);
	}
}

