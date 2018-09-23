import Vue from 'vue';

/**
 * This defines a Generically Typed Form Field Abstract
 */

export abstract class GenericFormField<T> extends Vue {

	public id: string = '';
	public name: string = '';
	public value: null | T = null;
	public required: boolean = false;
	public disabled: boolean = false;
	public label: string = '';
}

