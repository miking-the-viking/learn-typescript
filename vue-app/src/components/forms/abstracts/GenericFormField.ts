import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

/**
 * This defines a Generically Typed Form Field Abstract
 */

export abstract class GenericFormField<T> extends Vue {

	@Prop({ default: null }) protected id!: string | null;
	@Prop({ default: null }) protected name!: string | null;
	@Prop({ required: true}) protected value!: null | T | T[];
	@Prop({ default: false }) protected required!: boolean;
	@Prop({ default: false }) protected disabled!: boolean;
	@Prop({ default: null }) protected label!: string | null;
}

