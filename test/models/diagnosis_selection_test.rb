# == Schema Information
#
# Table name: diagnosis_selections
#
#  id           :integer          not null, primary key
#  query_id     :integer          not null
#  diagnosis_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class DiagnosisSelectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
